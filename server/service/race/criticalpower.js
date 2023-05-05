import { getEmptyCP } from '../power/empty-cp.js';
import { getIntervals } from '../power/powerintervals.js';
import { getFullDataUrl } from '../zwift/activity.js';
import { getPowers } from '../zwift/power.js';

export async function addCriticalPowers(results) {
  try {
    const resultsWithCP = [];
    for (const result of results) {
      const weightRider = result.profileData.weightInGrams / 1000;

      const fullDataUrl = await getFullDataUrl(result.activityData.activityId);
      // если ссылки на активность нет (райдер еще не закончил активность)
      if (!fullDataUrl) {
        result.cpBestEfforts = getEmptyCP();
        resultsWithCP.push(result);
        continue;
      }

      const powerInWatts = await getPowers(fullDataUrl);
      const powerInWattsCorrect = sliceExcess(
        powerInWatts,
        result.activityData.durationInMilliseconds
      );
      const cpBestEfforts = getIntervals(powerInWattsCorrect, weightRider);

      result.cpBestEfforts = cpBestEfforts;
      resultsWithCP.push(result);
    }
    return resultsWithCP;
  } catch (error) {
    throw error;
  }
}

function sliceExcess(powerArray, time) {
  const secondsInRace = Math.round(time / 1000);
  return powerArray?.slice(0, secondsInRace);
}
