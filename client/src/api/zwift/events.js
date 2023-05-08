// запрос данных заезда по eventId
import axios from 'axios';

import { myAxios } from '../axios';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

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

export async function getEvent(eventId) {
  try {
    const response = await axios({
      url: `${serverExpress}/api/race/events/${eventId}`,
      method: 'get',
    });

    return response;
  } catch (error) {
    // console.error(error); // eslint-disable-line
    throw error;
  }
}
