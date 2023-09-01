import { getRequest } from './request-get.js';

// запрос данных Райдера с сервера Zwift
export async function getZwiftRiderService(zwiftId) {
  try {
    if (zwiftId == 0) return '';
    const urlRiderData = `profiles/${zwiftId}`;
    const riderData = await getRequest(urlRiderData, false);

    return riderData;
  } catch (error) {
    throw error;
  }
}
