import { loggingAdmin } from '../log.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// запрос данных Эвента с сервера Zwift
export async function getEventZwiftService(eventId: string, userId: string) {
  const urlEventData = `events/${eventId}?skip_cache=false`;
  const eventData = await getRequest(urlEventData);
  // логирование действия
  if (userId) {
    const description = 'getZwiftEventData';
    const { id, name, eventStart } = eventData;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return eventData;
}
// обновление данных заезда на сервере Zwift
export async function putEventZwiftService(event, userId) {
  const urlEventData = `events/${event.eventData.id}`;
  const eventData = await putRequest(urlEventData, event);
  // логирование действия
  const description = 'updateZwiftEventData';
  const { id, name, eventStart } = event.eventData;
  await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });

  return { eventData, message: 'Изменения сохранены' };
}
