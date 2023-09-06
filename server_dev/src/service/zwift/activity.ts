import { getRequest } from './request-get.js';

// types
import { ActivitiesDataFromZwiftAPI } from '../../types/zwiftAPI/activitiesFromZwift.interface.js';

// получение данных fit файла активности (заезда) райдера
export async function getFullDataUrl(activityId: string) {
  try {
    const url = `activities/${activityId}`;
    const activity: ActivitiesDataFromZwiftAPI = await getRequest(url, false);

    // если нет данных активности (приватность аккаунта)
    if (!activity) {
      return null;
    }

    return activity.fitnessData.fullDataUrl;
  } catch (error) {
    console.log(error);
  }
}
