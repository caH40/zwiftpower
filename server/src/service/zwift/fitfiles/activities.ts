import { getRequest } from '../request-get.js';

// types
import { activityFeedFromZwiftAPI } from '../../../types/zwiftAPI/activity-feedFromZwift.interface.js';
import { ActivityFeedShort } from '../../../types/types.interface.js';

export async function getActivities(zwiftId: number) {
  const url = `activity-feed/feed/?feedType=OTHER_PROFILE&profile_id=${zwiftId}&limit=50`;
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
  }));
  return activities;
}
