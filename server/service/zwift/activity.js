import { getRequest } from './request-get.js';

// получение URL fit файла активности (заезда)
export async function getFullDataUrl(activityId) {
  try {
    const url = `activities/${activityId}`;
    const activity = await getRequest(url);
    return activity.fitnessData.fullDataUrl;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
