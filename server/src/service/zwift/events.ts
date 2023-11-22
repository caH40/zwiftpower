import { loggingAdmin } from '../log.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// types
import { PutEvent } from '../../types/http.interface.js';
import { eventDataFromZwiftAPI } from '../../types/zwiftAPI/eventsDataFromZwift.interface.js';
import { putEventService } from '../race/events-put.js';
import { errorHandler } from '../../errors/error.js';

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

/**
 * Сервис внесения изменений (обновление) данных заезда на сервере Zwift в Эвенте
 */
export async function putEventZwiftService(event: PutEvent, userId?: string) {
  const urlEventData = `events/${event.eventData.id}`;
  const eventData = await putRequest(urlEventData, event);

  // после внесения изменений на сервере Звифт => запрос новых данны и сохранения в БД
  // задержка нужная, что бы на сервере Звифта данные Эвента успели обновиться
  const eventId = event.eventData.id;
  setTimeout(
    async () => await putEventService(eventId, userId).catch((e) => errorHandler(e)),
    3000
  );

  // логирование действия
  if (userId) {
    const description = 'updateZwiftEventData';
    const { id, name, eventStart } = event.eventData;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { eventData, message: 'Изменения сохранены' };
}
