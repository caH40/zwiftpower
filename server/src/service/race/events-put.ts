import { loggingAdmin } from '../../logger/logger-admin.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { updateStartInfoEvent } from '../updates/schedule/start-event.js';
import { getEventZwiftService } from '../zwift/events.js';
import { updateEventAndSubgroups } from './event-update.js';
import { deleteSignedRiders } from './signed-riders-delete.js';
import { putSignedRidersService } from './signed-riders.js';

/**
 * Обновление данных Эвента и зарегистрированных райдеров в БД после:
 * -запроса на обновление Модератором;
 * -обновления по расписанию;
 * -внесения изменений в параметры Эвента;
 *
 * Event уже есть в БД, поэтому можно определить Организатора и его токен для запросов в ZwiftAPI.
 */
export async function putEventService(eventId: number, userId?: string) {
  const eventDB = await ZwiftEvent.findOne(
    { id: eventId },
    { microserviceExternalResourceId: true, _id: false }
  ).lean<{ microserviceExternalResourceId: string }>();

  if (!eventDB) {
    throw new Error(`Не найден Эвент с id:${eventId} в БД!`);
  }

  // Id клуба в котором был создан Эвент, данные которого обновляются.
  const clubId = eventDB.microserviceExternalResourceId;

  // Запрос данных Event (eventId) с API Zwift
  const event = await getEventZwiftService({ eventId, clubId });

  if (!event) {
    throw new Error(`Не найден Эвент с id:${eventId} на сервере Zwift`);
  }

  // удаление зарегистрированных райдеров из подгрупп subgroupIds
  await deleteSignedRiders(eventId);

  // Обновление данных Эвента, данных подгрупп в БД
  const eventSaved = await updateEventAndSubgroups(event);

  // получение зарегистрированных райдеров с ZwiftAPI и сохранение в БД
  // обновление зарегистрированных райдеров происходит после обновления
  // подгрупп, так как меняются _id у подгрупп
  await putSignedRidersService({ eventId, clubId });

  // Обновление свойства старта заезда в одном event
  await updateStartInfoEvent(eventSaved);

  // логирование действия
  if (userId) {
    const description = 'updateEventInDB';
    const { id, name, eventStart } = event;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { message: `Обновлены данные ${event.name}` };
}
