import { getRequest } from './request-get.js';

// получение данных мощности из активности (заезда)
export async function getPowers(fullDataUrl) {
  try {
    const url = fullDataUrl.split('https://us-or-rly101.zwift.com/api/')[1];
    const { powerInWatts } = await getRequest(url);
    return powerInWatts;
  } catch (error) {
    throw error;
  }
}
