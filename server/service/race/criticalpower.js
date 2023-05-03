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
      const cpBestEfforts = getIntervals(powerInWatts, weightRider);

      result.cpBestEfforts = cpBestEfforts;
      resultsWithCP.push(result);
    }
    return resultsWithCP;
  } catch (error) {
    throw error;
  }
}
