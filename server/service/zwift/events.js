import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// запрос данных Эвента с сервера Zwift
export async function getEventService(eventId) {
  try {
    const urlEventData = `events/${eventId}?skip_cache=false`;
    const eventData = await getRequest(urlEventData);
    return eventData;
  } catch (error) {
    throw error;
  }
}
// обновление данных заезда на сервере Zwift
export async function putEventService(event) {
  try {
    const urlEventData = `events/${event.eventData.id}`;
    const eventData = await putRequest(urlEventData, event);
    return { eventData, message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
