import { getRequest } from '../request-get.js';

export async function getActivities(zwiftId) {
  try {
    const url = `activity-feed/feed/?feedType=OTHER_PROFILE&profile_id=${zwiftId}&limit=50`;
    const response = await getRequest(url);
    const activities = response.map((activity) => ({
      id: activity.id_str,
      date: new Date(activity.startDate).getTime(),
    }));
    return activities;
  } catch (error) {
    throw error;
  }
}
