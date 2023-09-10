import { FitFile } from '../../../Model/FitFile.js';
import { ActivityFeedShort } from '../../../types/types.interface.js';

/**
 * Фильтрация активностей которые старше 90 дней
 */
export async function filterActivities(activities: ActivityFeedShort[], zwiftId: number) {
  const millisecondsIn90Days = 90 * 24 * 60 * 60 * 1000;
  const { dateLastedActivity } = (await FitFile.findOne({ zwiftId })) || {
    dateLastedActivity: 0,
  };

  const activitiesFiltered = activities.filter((activity: ActivityFeedShort) => {
    const dateActivity = new Date(activity.date).getTime();

    const dateInPeriod90Days = Date.now() - millisecondsIn90Days < dateActivity;

    const isNewActivity = dateActivity > dateLastedActivity;

    // Каждый раз придется пробегаться по всем активностям, которые не старше 90 дней.
    return dateInPeriod90Days && isNewActivity;
  });

  return activitiesFiltered;
}
