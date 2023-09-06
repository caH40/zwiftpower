import { getRequest } from './request-get.js';

// types
import { FitfileFullDataFromZwiftAPI } from '../../types/zwiftAPI/fitfileFullDataFromZwift.interface.js';

// получение данных мощности из активности (заезда)
export async function getPowers(fullDataUrl: string) {
  try {
    const url = fullDataUrl.split('https://us-or-rly101.zwift.com/api/')[1];
    const fitFile: FitfileFullDataFromZwiftAPI = await getRequest(url, false);
    return fitFile.powerInWatts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
