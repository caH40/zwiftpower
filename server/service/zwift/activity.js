import { getRequest } from './request-get.js';

// получение данных fit файла активности (заезда) райдера
export async function getFullDataUrl(activityId) {
  try {
    const url = `activities/${activityId}`;
    const activity = await getRequest(url, false);

    // если нет данных активности (приватность аккаунта)
    if (!activity) {
      return null;
    }

    return activity.fitnessData.fullDataUrl;
  } catch (error) {
    throw error;
  }
}
