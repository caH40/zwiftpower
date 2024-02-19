import { getRequest } from '../request-get.js';

// types
import { activityFeedFromZwiftAPI } from '../../../types/zwiftAPI/activity-feedFromZwift.interface.js';
import { ActivityFeedShort } from '../../../types/types.interface.js';
import { errorHandler } from '../../../errors/error.js';
import { ActivitiesDataFromZwiftAPI } from '../../../types/zwiftAPI/activitiesFromZwift.interface.js';

export async function getActivities(zwiftId: number, limit = 50) {
  const url = `activity-feed/feed/?feedType=OTHER_PROFILE&profile_id=${zwiftId}&${limit}`;
  const response: activityFeedFromZwiftAPI[] = await getRequest(url);

  // выход, если ошибка при получении активностей
  if (!response) {
    return null;
  }

  const activities: ActivityFeedShort[] = response.map((activity) => ({
    id: activity.id_str,
    date: new Date(activity.startDate).getTime(),
    name: activity.name,
    eventId: activity.eventId,
    activityId: activity.id_str,
  }));
  return activities;
}

/**
 * получение данных активности activityId райдера
 */
export async function getActivitiesFullData(activityId: string) {
  try {
    const url = `activities/${activityId}`;
    const activity: ActivitiesDataFromZwiftAPI = await getRequest(url);

    // если нет данных активности (приватность аккаунта)
    if (!activity) {
      return null;
    }

    return activity;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}
