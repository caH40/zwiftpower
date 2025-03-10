import { loggingAdmin } from '../../logger/logger-admin.js';
import { getRequest } from './api/request-get.js';
import { putRequest } from './api/request-put.js';
import { putEventService } from '../race/events-put.js';
import { handleAndLogError } from '../../errors/error.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getAccessTokenOrganizer, getTokenForEvent } from './token.js';

// types
import { PutEvent } from '../../types/http.interface.js';
import { eventDataFromZwiftAPI } from '../../types/zwiftAPI/eventsDataFromZwift.interface.js';
import { TAccessExpressionObj } from '../../types/model.interface.js';
import { Types } from 'mongoose';

// Запрос данных Эвента с сервера Zwift от модераторов клубов.
// При clubId:undefined значит запрос на ZwiftAPI будет осуществляться по общему токену-доступа.
// У организатора для всех клубов один и тот же токен от бота. То есть один бот добавляется во все клубы организатора.
export async function getEventZwiftService({
  eventId,
  clubId,
  organizerId,
}: {
  eventId: number;
  clubId?: string;
  organizerId?: string;
}) {
  let tokenOrganizer;
  if (clubId) {
    tokenOrganizer = await getAccessTokenOrganizer({ clubId, importanceToken: 'main' });
  } else if (organizerId) {
    tokenOrganizer = await getTokenForEvent({ organizerId });
  }

  // Получение данных Эвента из ZwiftAPI.
  const urlEventData = `events/${eventId}?skip_cache=false`;
  const eventData: eventDataFromZwiftAPI | null = await getRequest({
    url: urlEventData,
    tokenOrganizer,
  });

  if (!eventData) {
    throw new Error(
      `Не найден Эвент id:${eventId}, или Эвент создан в клубе другого Организатора!`
    );
  }

  // получение typeRaceCustom
  const eventDB: { typeRaceCustom: string; accessExpressionObj: TAccessExpressionObj } | null =
    await ZwiftEvent.findOne(
      { id: eventId },
      { _id: false, typeRaceCustom: true, accessExpressionObj: true }
    ).lean();

  return { ...eventData, ...eventDB };
}

/**
 * Запрос данных Эвента с сервера Zwift для редактирования модератором.
 */
export async function getEventZwiftForEditService({ eventId }: { eventId: number }) {
  // Для страницы "редактирование Эвента", Эвент уже есть в БД.
  const eventDB = await ZwiftEvent.findOne(
    { id: eventId },
    {
      organizer: true,
      organizerId: true,
      typeRaceCustom: true,
      organizerLabel: true,
      accessExpressionObj: true,
      _id: false,
    }
  ).lean<{
    organizer: string;
    organizerId?: Types.ObjectId;
    typeRaceCustom: string;
    organizerLabel: string;
    accessExpressionObj: TAccessExpressionObj;
  }>();

  // Проверка, что эвент для редактирования есть в БД.
  if (!eventDB) {
    throw new Error(
      `Не найден в БД Эвент для редактирования с id:${eventId} в модуле getEventZwiftForEditService`
    );
  }

  const { organizer, organizerId } = eventDB;

  // Получения токена доступа для соответствующего Организатора.
  const tokenOrganizer = await getTokenForEvent({
    ...(organizerId && { organizerId: organizerId }),
    organizerLabel: organizer,
  });

  // Получение данных Эвента из ZwiftAPI.
  const urlEventData = `events/${eventId}?skip_cache=false`;
  const eventData: eventDataFromZwiftAPI | null = await getRequest({
    url: urlEventData,
    tokenOrganizer,
  });

  if (!eventData) {
    throw new Error(`Не найден Эвент id:${eventId}`);
  }

  return { ...eventData, ...eventDB };
}

/**
 * Сервис внесения изменений (обновление) данных заезда на сервере Zwift в Эвенте
 */
export async function putEventZwiftService(event: PutEvent, userId: string) {
  const tokenOrganizer = await getAccessTokenOrganizer({
    clubId: event.eventData.microserviceExternalResourceId,
    importanceToken: 'main',
  });

  const id = event.eventData.id;
  const urlEventData = `events/${id}`;
  const eventData = await putRequest({ url: urlEventData, data: event, tokenOrganizer });

  // изменение в БД typeRaceCustom,categoryEnforcementName (в API Zwift не передается, локальный параметр)
  await ZwiftEvent.findOneAndUpdate(
    { id },
    {
      $set: {
        typeRaceCustom: event.eventData.typeRaceCustom,
        accessExpressionObj: event.eventData.accessExpressionObj,
      },
    },
    { new: true }
  );

  // после внесения изменений на сервере Звифт => запрос новых данны и сохранения в БД
  // задержка нужная, что бы на сервере Звифта данные Эвента успели обновиться
  const eventId = event.eventData.id;
  setTimeout(
    async () => await putEventService(eventId, userId).catch((e) => handleAndLogError(e)),
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
