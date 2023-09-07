import { getRequest } from '../request-get.js';

// types
import { activityFeedFromZwiftAPI } from '../../../types/zwiftAPI/activity-feedFromZwift.interface.js';

export async function getActivities(zwiftId: number) {
  const url = `activity-feed/feed/?feedType=OTHER_PROFILE&profile_id=${zwiftId}&limit=50`;
  const response: activityFeedFromZwiftAPI[] = await getRequest(url, false);
  const activities = response.map((activity) => ({
    id: activity.id_str,
    date: new Date(activity.startDate).getTime(),
    name: activity.name,
  }));
  return activities;
}
