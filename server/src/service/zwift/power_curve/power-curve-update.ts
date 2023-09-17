import { FitFile } from '../../../Model/FitFile.js';
import { PowerCurve } from '../../../Model/PowerCurve.js';
import { intervals } from './intervals-cp.js';
import { getInterval } from './powerintervals.js';

// types
import { FitFileSchema, PowerCurveSchema } from '../../../types/model.interface.js';
import { filter90Days } from './update/filter.js';
import { CriticalPower } from '../../../types/types.interface.js';

export async function updatePowerCurve(zwiftId: number) {
  try {
    const fitFileDB: FitFileSchema | null = await FitFile.findOne({ zwiftId });
    if (!fitFileDB) {
      return console.log(`Не найден fitfile для ${zwiftId}`);
    }

    // кривая мощности из БД
    const powerCurveDB: PowerCurveSchema | null = await PowerCurve.findOne({ zwiftId });
    if (!powerCurveDB) {
      return;
    }

    // данные не старше 90 дней (была фильтрация в fitfiles, здесь зачем еще раз?)
    const { pointsWattsFiltered, pointsWattsPerKgFiltered } = filter90Days(powerCurveDB);

    // инициализация массивов для хранения CP
    const cpWattsUpdated: CriticalPower[] = [];
    const cpWattsPerKgUpdated: CriticalPower[] = [];

    // для каждого временного интервала поиск максимального значения мощности и удельной мощности
    for (const interval of intervals) {
      // объект по мощности
      let cpWattsCurrent = pointsWattsFiltered.find((cp) => cp.duration === interval);

      // если интервал с CP не найден, то создается с нулевыми значениями
      if (cpWattsCurrent === undefined) {
        cpWattsCurrent = { duration: interval, value: 0, date: Date.now(), name: '' };
      }

      // объект по удельной мощности
      let cpWattsPerKgCurrent = pointsWattsPerKgFiltered.find((cp) => cp.duration === interval);

      // если интервал с CP не найден, то создается с нулевыми значениями
      if (!cpWattsPerKgCurrent) {
        cpWattsPerKgCurrent = { duration: interval, value: 0, date: Date.now(), name: '' };
      }

      // поиск данных для интервала в "сырых данных" заезда
      for (const activity of fitFileDB.activities) {
        const powerInWatts: number[] = JSON.parse(activity.powerInWatts);

        const weightInKilogram = activity.weightInGrams / 1000;
        const cpBestEfforts = getInterval({ powerInWatts, weightInKilogram, interval });

        if (cpBestEfforts.watts >= cpWattsCurrent.value)
          cpWattsCurrent = {
            duration: interval,
            value: cpBestEfforts.watts,
            date: activity.date,
            name: activity.name,
          };

        if (cpBestEfforts.wattsKg >= cpWattsPerKgCurrent.value)
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

    await PowerCurve.findOneAndUpdate(
      { zwiftId },
      {
        $set: {
          date: Date.now(),
          pointsWatts: cpWattsUpdated,
          pointsWattsPerKg: cpWattsPerKgUpdated,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
