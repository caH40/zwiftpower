import { myAxios } from '../axios';

export async function putResults(eventId) {
  try {
    const response = await myAxios({
      url: '/api/race/results',
      method: 'put',
      data: { eventId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

export async function getResults(eventId) {
  try {
    const response = await myAxios({
      url: `/api/race/results/${eventId}`,
      method: 'get',
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
