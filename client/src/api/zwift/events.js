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

export async function changeZwiftEvents(event) {
  try {
    const response = await myAxios({
      url: '/api/zwift/events',
      method: 'put',
      data: { event },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

// сохранение данных Эвента с Zwift в БД
export async function postEvent(event) {
  try {
    const response = await myAxios({
      url: '/api/race/events',
      method: 'post',
      data: { event },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
