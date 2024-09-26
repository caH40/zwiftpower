import { loggingAdmin } from '../../logger/logger-admin.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';

// types
import { PutEvent } from '../../types/http.interface.js';
import { eventDataFromZwiftAPI } from '../../types/zwiftAPI/eventsDataFromZwift.interface.js';
import { putEventService } from '../race/events-put.js';
import { errorHandler } from '../../errors/error.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { checkModeratorClub } from '../moderator-club.js';

// запрос данных Эвента с сервера Zwift
export async function getEventZwiftService(eventId: number) {
  const urlEventData = `events/${eventId}?skip_cache=false`;
  const eventData: eventDataFromZwiftAPI | null = await getRequest(urlEventData);

  if (!eventData) {
    throw new Error(`Не найден Эвент id:${eventId}`);
  }

  // получение typeRaceCustom
  const eventDB: { typeRaceCustom: string } | null = await ZwiftEvent.findOne(
    { id: eventId },
    { _id: false, typeRaceCustom: true }
  );

  return { ...eventData, typeRaceCustom: eventDB?.typeRaceCustom };
}

/**
 * Сервис внесения изменений (обновление) данных заезда на сервере Zwift в Эвенте
 */
export async function putEventZwiftService(event: PutEvent, userId: string) {
  // Проверка является ли userId модератором клуба в котором создается данный Эвент
  await checkModeratorClub(userId, event.eventData.microserviceExternalResourceId);

  const id = event.eventData.id;
  const urlEventData = `events/${id}`;
  const eventData = await putRequest(urlEventData, event);

  const categoryEnforcementDescription =
    event.eventData.categoryEnforcementDescription != null
      ? { categoryEnforcementDescription: event.eventData.categoryEnforcementDescription }
      : undefined;

  // изменение в БД typeRaceCustom,categoryEnforcementDescription (в API Zwift не передается, локальный параметр)
  await ZwiftEvent.findOneAndUpdate(
    { id },
    {
      $set: {
        typeRaceCustom: event.eventData.typeRaceCustom,
        ...categoryEnforcementDescription,
      },
    }
  );

  // после внесения изменений на сервере Звифт => запрос новых данны и сохранения в БД
  // задержка нужная, что бы на сервере Звифта данные Эвента успели обновиться
  const eventId = event.eventData.id;
  setTimeout(
    async () => await putEventService(eventId, userId).catch((e) => errorHandler(e)),
    1500
  );

  // логирование действия
  if (userId) {
    const description = 'putZwiftEventData';
    const { id, name, eventStart } = event.eventData;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { eventData, message: 'Изменения сохранены' };
}
