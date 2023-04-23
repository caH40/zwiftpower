import { getAccessToken } from './token.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

export async function getEventService(eventId, username, password) {
  try {
    const token = await getAccessToken(username, password);
    if (!token) throw { message: 'Ошибка при получении токена' };

    const urlEventData = `events/${eventId}?skip_cache=false`;

    const eventData = await getRequest(urlEventData, token);

    return eventData;
  } catch (error) {
    throw error;
  }
}
export async function putEventService(event, username, password) {
  try {
    const token = await getAccessToken(username, password);
    if (!token) throw { message: 'Ошибка при получении токена' };
    const urlEventData = `events/${event.eventData.id}`;

    const eventData = await putRequest(urlEventData, token, event);

    return { eventData, message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
export async function postEventService(event, username, password) {
  try {
    console.log(event);
    const token = await getAccessToken(username, password);
    if (!token) throw { message: 'Ошибка при получении токена' };
    console.log(token);
    // const urlEventData = `events/${event.eventData.id}`;

    // const eventData = await putRequest(urlEventData, token, event);

    // return { eventData, message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
