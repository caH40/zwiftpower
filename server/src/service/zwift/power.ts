import { getRequest } from './api/request-get.js';

// types
import { FitfileFullDataFromZwiftAPI } from '../../types/zwiftAPI/fitfileFullDataFromZwift.interface.js';

/**
 * Получение данных мощности из активности (заезда)
 */
export async function getPowers(fullDataUrl: string) {
  const url = fullDataUrl.split('https://us-or-rly101.zwift.com/api/')[1];
  const fitFile: FitfileFullDataFromZwiftAPI = await getRequest({ url });
  return fitFile.powerInWatts;
}
