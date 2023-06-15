import { getFullDataUrl } from '../activity.js';
import { getPowers } from '../power.js';
import { getZwiftRiderService } from '../rider.js';
import { getActivities } from './activities.js';
import { filterActivities } from './filter-activities.js';
import { intervals } from './intervals-cp.js';
import { savePowerCurve } from './power-curve-update.js';
import { getIntervals } from './powerintervals.js';

export async function updatePowerCurve(zwiftId) {
  try {
    // последние 50 активностей райдера zwiftId
    const activities = await getActivities(zwiftId);
    // исключение активностей которые уже есть в БД
    const activitiesFiltered = await filterActivities(activities, zwiftId);
    // запрос данный райдера для получения веса
    const rider = await getZwiftRiderService(zwiftId);
    const weightInKilogram = rider.weight / 1000;

    for (const activityCurrent of activitiesFiltered) {
      const fullDataUrl = await getFullDataUrl(activityCurrent.id);
      const powerInWatts = await getPowers(fullDataUrl);

      const cpBestEfforts = getIntervals(powerInWatts, weightInKilogram, intervals);
      const powerCurveSaved = await savePowerCurve(
        zwiftId,
        cpBestEfforts,
        activityCurrent.date
      );
    }
  } catch (error) {
    console.log(error);
  }
}
