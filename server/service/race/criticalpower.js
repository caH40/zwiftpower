import { getIntervals } from '../powerintervals.js';
import { getFullDataUrl } from '../zwift/activity.js';
import { getPowers } from '../zwift/power.js';

export async function addCriticalPowers(results) {
  try {
    const resultsWithCP = [];
    for (const result of results) {
      const weightRider = result.profileData.weightInGrams / 1000;

      const fullDataUrl = await getFullDataUrl(result.activityData.activityId);
      // const start = Date.now();
      const powerInWatts = await getPowers(fullDataUrl);
      // const finish = Date.now();
      const cpBestEfforts = getIntervals(powerInWatts, weightRider);

      // console.log(finish - start);
      result.cpBestEfforts = cpBestEfforts;
      resultsWithCP.push(result);
    }
    return resultsWithCP;
  } catch (error) {
    throw error;
  }
}
