import { FitFile } from '../../Model/FitFile.js';
import { getEmptyCP } from '../power/empty-cp.js';
import { getIntervals } from '../power/powerintervals.js';
import { getFullDataUrl } from '../zwift/activity.js';
import { getPowers } from '../zwift/power.js';
import { errorHandler } from '../../errors/error.js';

// types
import { ResultEventAdditional } from '../../types/types.interface.js';

export async function addCriticalPowers(
  results: ResultEventAdditional[],
  nameAndDate: {
    name: string;
    eventStart: number;
  }
) {
  try {
    const resultsWithCP = [];
    for (const result of results) {
      const weightRider = result.profileData.weightInGrams / 1000;

      // получение данных fit файла активности (заезда) райдера
      const fullDataUrl = await getFullDataUrl(result.activityData.activityId);
      // если ссылки на активность нет (райдер еще не закончил активность)
      if (!fullDataUrl) {
        result.cpBestEfforts = getEmptyCP();
        resultsWithCP.push(result);
        continue;
      }

      const powerInWatts: number[] = await getPowers(fullDataUrl);
      // добавление фитфайла в БД ======
      await addToDB({ powerInWatts, result, nameAndDate });
      // обрезка заезда после завершения гонки
      const powerInWattsCorrect = sliceExcess(
        powerInWatts,
        result.activityData.durationInMilliseconds
      );
      // получение critical powers гонки
      const cpBestEfforts = getIntervals(powerInWattsCorrect, weightRider);

      result.cpBestEfforts = cpBestEfforts;
      resultsWithCP.push(result);
    }
    return resultsWithCP;
  } catch (error) {
    errorHandler(error);
  }
}

/**
 * Исключение данных мощности, полученных после завершения гонки (исключение закатки после гонки)
 */
function sliceExcess(powerArray: number[], time: number) {
  const secondsInRace = Math.round(time / 1000);
  return powerArray?.slice(0, secondsInRace);
}

/**
 * Добавление данных мощности в заезде из fitfile в БД
 */
interface AddToDB {
  powerInWatts: number[];
  result: ResultEventAdditional;
  nameAndDate: {
    name: string;
    eventStart: number;
  };
}

async function addToDB({ powerInWatts, result, nameAndDate }: AddToDB) {
  const power = {
    name: nameAndDate.name,
    date: nameAndDate.eventStart,
    powerInWatts: JSON.stringify(powerInWatts),
    weightInGrams: result.profileData.weightInGrams,
  };
  const zwiftId = result.profileId;
  const fitFileDB = await FitFile.findOne({ zwiftId });

  if (!fitFileDB) {
    await FitFile.create({ zwiftId });
  }

  await FitFile.findOneAndUpdate({ zwiftId }, { $addToSet: { activities: power } });
}
