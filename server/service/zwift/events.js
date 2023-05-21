import { LogsAdmin } from '../../Model/LogsAdmin.js';
import { loggingAdmin } from '../log.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// запрос данных Эвента с сервера Zwift
export async function getEventService(eventId, userId) {
  try {
    const urlEventData = `events/${eventId}?skip_cache=false`;
    const eventData = await getRequest(urlEventData);
    // логирование действия
    const description = 'getZwiftEventData';
    const { id, name, eventStart } = eventData;
    await loggingAdmin(id, name, eventStart, userId, description);

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
    const description = 'updateZwiftEventData';
    const { id, name, eventStart } = event.eventData;
    await loggingAdmin(id, name, eventStart, userId, description);

    return { eventData, message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
