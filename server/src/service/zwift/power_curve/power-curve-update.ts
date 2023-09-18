import { intervals } from './intervals-cp.js';
import { getInterval } from './powerintervals.js';
import { getFitFile, getPowerCurve, updatePowerCurveRider } from './power-curve-updateDB.js';
import { dateBefore90Days } from '../../../asset/date.js';

// types
import { filter90Days } from './update/filter.js';
import { CriticalPower } from '../../../types/types.interface.js';

export async function updatePowerCurve(zwiftId: number) {
  try {
    // получение актуальных фитфайлов райдера (zwiftId) из БД
    const fitFile = await getFitFile(zwiftId);
    if (!fitFile) {
      return console.log(`Не найден fitfile для ${zwiftId}`);
    }

    // получение кривой мощности райдера (zwiftId) из БД
    const powerCurve = await getPowerCurve(zwiftId);
    if (!powerCurve) {
      return;
    }

    // данные не старше 90 дней
    const { pointsWattsFiltered, pointsWattsPerKgFiltered } = filter90Days(powerCurve);

    // инициализация массивов для хранения CP
    const cpWattsUpdated: CriticalPower[] = [];
    const cpWattsPerKgUpdated: CriticalPower[] = [];

    // для каждого временного интервала поиск максимального значения мощности и удельной мощности
    for (const interval of intervals) {
      // объект по мощности
      let cpWattsCurrent = pointsWattsFiltered.find((cp) => cp.duration === interval);

      // если интервал с CP не найден, то создается с нулевыми значениями
      if (!cpWattsCurrent) {
        cpWattsCurrent = { duration: interval, value: 0, date: Date.now(), name: '' };
      }

      // объект по удельной мощности
      let cpWattsPerKgCurrent = pointsWattsPerKgFiltered.find((cp) => cp.duration === interval);

      // если интервал с CP не найден, то создается с нулевыми значениями
      if (!cpWattsPerKgCurrent) {
        cpWattsPerKgCurrent = { duration: interval, value: 0, date: Date.now(), name: '' };
      }

      // поиск данных для интервала в "сырых данных" заезда
      for (const activity of fitFile.activities) {
        const powerInWatts: number[] = JSON.parse(activity.powerInWatts);

        const weightInKilogram = activity.weightInGrams / 1000;
        const cpBestEfforts = getInterval({ powerInWatts, weightInKilogram, interval });

        if (cpBestEfforts.watts >= cpWattsCurrent.value && activity.date >= dateBefore90Days)
          cpWattsCurrent = {
            duration: interval,
            value: cpBestEfforts.watts,
            date: activity.date,
            name: activity.name,
          };

        if (
          cpBestEfforts.wattsKg >= cpWattsPerKgCurrent.value &&
          activity.date >= dateBefore90Days
        )
          cpWattsPerKgCurrent = {
            duration: interval,
            value: cpBestEfforts.wattsKg,
            date: activity.date,
            name: activity.name,
          };
      }
      cpWattsUpdated.push(cpWattsCurrent);
      cpWattsPerKgUpdated.push(cpWattsPerKgCurrent);
    }

    // обновление кривой мощности райдера (zwiftId) в БД
    await updatePowerCurveRider({
      zwiftId,
      cpWattsUpdated,
      cpWattsPerKgUpdated,
    });
  } catch (error) {
    console.log(error);
  }
}
