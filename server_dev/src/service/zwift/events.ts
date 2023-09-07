import { loggingAdmin } from '../log.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// types
import { PutEvent } from '../../types/http.interface.js';
import { eventDataFromZwiftAPI } from '../../types/zwiftAPI/eventsDataFromZwift.interface.js';

// запрос данных Эвента с сервера Zwift
export async function getEventZwiftService(eventId: number, userId?: string) {
  const urlEventData = `events/${eventId}?skip_cache=false`;
  const eventData: eventDataFromZwiftAPI = await getRequest(urlEventData);
  // логирование действия
  if (userId) {
    const description = 'getZwiftEventData';
    const { id, name, eventStart } = eventData;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return eventData;
}
// обновление данных заезда на сервере Zwift
export async function putEventZwiftService(event: PutEvent, userId?: string) {
  const urlEventData = `events/${event.eventData.id}`;
  const eventData = await putRequest(urlEventData, event);
  // логирование действия
  if (userId) {
    const description = 'updateZwiftEventData';
    const { id, name, eventStart } = event.eventData;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { eventData, message: 'Изменения сохранены' };
}
