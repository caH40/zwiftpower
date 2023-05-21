import { LogsAdmin } from '../../Model/LogsAdmin.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// запрос данных Эвента с сервера Zwift
export async function getEventService(eventId, userId) {
  try {
    const urlEventData = `events/${eventId}?skip_cache=false`;
    const eventData = await getRequest(urlEventData);
    // логирование действия
    const millisecondsIn3Hours = 3 * 60 * 60 * 1000;
    const eventStart = new Date(eventData.eventStart).getTime() + millisecondsIn3Hours;
    await LogsAdmin.create({
      userId,
      date: Date.now(),
      type: 'get zwift event data',
      event: {
        id: eventData.id,
        name: eventData.name,
        start: eventStart,
      },
    });
    return eventData;
  } catch (error) {
    throw error;
  }
}
// обновление данных заезда на сервере Zwift
export async function putEventService(event, userId) {
  try {
    const urlEventData = `events/${event.eventData.id}`;
    const eventData = await putRequest(urlEventData, event);
    // логирование действия
    const millisecondsIn3Hours = 3 * 60 * 60 * 1000;
    const eventStart = new Date(event.eventData.eventStart).getTime() + millisecondsIn3Hours;
    await LogsAdmin.create({
      userId,
      date: Date.now(),
      type: 'update zwift event data',
      event: {
        id: event.eventData.id,
        name: event.eventData.name,
        start: eventStart,
      },
    });
    return { eventData, message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
