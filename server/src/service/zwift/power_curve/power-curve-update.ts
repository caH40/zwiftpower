import { intervals } from './intervals-cp.js';
import { getInterval } from './powerintervals.js';
import { getFitFile, updatePowerCurveRider } from './power-curve-updateDB.js';
import { errorHandler } from '../../../errors/error.js';

// types
import { CriticalPower } from '../../../types/model.interface.js';

/**
 * Обновление Кривой мощности для райдера с zwiftId. Удаляется старая кривая и сохраняется новая в БД.
 * @param zwiftId zwiftId профиля райдера
 */
export async function updatePowerCurve(zwiftId: number): Promise<void> {
  try {
    // получение актуальных фитфайлов райдера (zwiftId) из БД
    const fitFile = await getFitFile(zwiftId);

    if (!fitFile) {
      return;
    }

    const bannedForLeaderboard = false;

    // инициализация массивов для хранения CP
    const cpWattsUpdated: CriticalPower[] = [];
    const cpWattsPerKgUpdated: CriticalPower[] = [];

    // для каждого временного интервала поиск максимального значения мощности и удельной мощности
    for (const interval of intervals) {
      let cpWattsCurrent = { value: 0 } as CriticalPower;
      let cpWattsPerKgCurrent = { value: 0 } as CriticalPower;

      // поиск данных для интервала в "сырых данных" заезда
      for (const activity of fitFile.activities) {
        const powerInWatts: number[] = JSON.parse(activity.powerInWatts);

        const weightInKilogram = activity.weightInGrams / 1000;
        const cpBestEfforts = getInterval({ powerInWatts, weightInKilogram, interval });

        if (cpBestEfforts.watts >= cpWattsCurrent!.value)
          cpWattsCurrent = {
            isVirtualPower: activity.isVirtualPower,
            duration: interval,
            value: cpBestEfforts.watts,
            date: activity.date,
            name: activity.name,
            bannedForLeaderboard,
          };

        if (cpBestEfforts.wattsKg >= cpWattsPerKgCurrent!.value)
          cpWattsPerKgCurrent = {
            isVirtualPower: activity.isVirtualPower,
            duration: interval,
            value: cpBestEfforts.wattsKg,
            date: activity.date,
            name: activity.name,
            bannedForLeaderboard,
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
    errorHandler(error);
  }
}
