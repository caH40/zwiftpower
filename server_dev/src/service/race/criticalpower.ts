import { FitFile } from '../../Model/FitFile.js';
import { getEmptyCP } from '../power/empty-cp.js';
import { getIntervals } from '../power/powerintervals.js';
import { getFullDataUrl } from '../zwift/activity.js';
import { getPowers } from '../zwift/power.js';

export async function addCriticalPowers(results, nameAndDate) {
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

      const powerInWatts = await getPowers(fullDataUrl);
      // добавление фитфайла в БД ======
      await addToDB(powerInWatts, result, nameAndDate);
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
    console.log(error);
  }
}

function sliceExcess(powerArray, time) {
  const secondsInRace = Math.round(time / 1000);
  return powerArray?.slice(0, secondsInRace);
}
// добавление данных мощности в заезде из fitfile в БД
async function addToDB(powerInWatts, result, { name, eventStart }) {
  const power = {
    name: name,
    date: eventStart,
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
