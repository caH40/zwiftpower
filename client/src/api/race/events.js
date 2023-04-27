import { myAxios } from '../axios';

export async function putEvent(eventId) {
  try {
    const response = await myAxios({
      url: '/api/race/events',
      method: 'put',
      data: { eventId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
export async function deleteEvent(eventId) {
  try {
    const response = await myAxios({
      url: '/api/race/events',
      method: 'delete',
      data: { eventId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
export async function deleteEventAndResults(eventId) {
  try {
    const response = await myAxios({
      url: '/api/race/events/results',
      method: 'delete',
      data: { eventId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
