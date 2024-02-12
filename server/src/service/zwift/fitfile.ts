import { getRequest } from './request-get.js';

// types
import { FitfileFullDataFromZwiftAPI } from '../../types/zwiftAPI/fitfileFullDataFromZwift.interface.js';

/**
 * Получение данных мощности из активности (заезда)
 * fullDataUrl - url на фитфайл в Звифте для текущей активности
 */
export async function getFitFileFromZwift(fullDataUrl: string) {
  const url = fullDataUrl.split('https://us-or-rly101.zwift.com/api/')[1];
  const fitFile: FitfileFullDataFromZwiftAPI | null = await getRequest(url);
  return fitFile;
}
