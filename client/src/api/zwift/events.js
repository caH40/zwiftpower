// запрос данных заезда по eventId
import { myAxios } from '../axios';

export async function getZwiftEvents(eventId) {
  try {
    const response = await myAxios({
      url: `/api/zwift/events/${eventId}`,
      method: 'get',
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
