import { getRequest } from './api/request-get.js';
import { errorHandler } from '../../errors/error.js';

// types
import { ActivitiesDataFromZwiftAPI } from '../../types/zwiftAPI/activitiesFromZwift.interface.js';

/**
 * Получение url fit-файла из активности (заезда) райдера
 */
export async function getFullDataUrl(activityId: string) {
  try {
    const url = `activities/${activityId}`;
    const activity: ActivitiesDataFromZwiftAPI = await getRequest({ url });

    // если нет данных активности (приватность аккаунта)
    if (!activity) {
      return null;
    }

    return activity.fitnessData.fullDataUrl;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}
