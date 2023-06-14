import { PowerCurve } from '../../../Model/PowerCurve.js';

// исключение активностей данные которые уже есть в power-curve
export async function filterActivities(activities, zwiftId) {
  try {
    const powerCurveDB = await PowerCurve.findOne({ zwiftId });
    if (!powerCurveDB) return activities;

    const activitiesFiltered = activities.filter(
      (activity) => new Date(activity.date) > powerCurveDB.dateLastRace
    );
    return activitiesFiltered;
  } catch (error) {
    throw error;
  }
}
