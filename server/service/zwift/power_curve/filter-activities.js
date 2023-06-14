import { PowerCurve } from '../../../Model/PowerCurve.js';

// исключение активностей данные которые уже есть в power-curve
export async function filterActivities(activities, zwiftId) {
  try {
    const powerCurveDB = await PowerCurve.findOne({ zwiftId });
    if (!powerCurveDB) return activities;

    const millisecondsIn90Days = 90 * 24 * 60 * 60 * 1000;

    const activitiesFiltered = activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      const dateInPeriod90Days = Date.now() - millisecondsIn90Days < activityDate;

      // активность не должна быть старше 90 дней и
      return activityDate > powerCurveDB.dateLastRace && dateInPeriod90Days;
    });
    return activitiesFiltered;
  } catch (error) {
    throw error;
  }
}
