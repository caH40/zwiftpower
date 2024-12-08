import { loggingAdmin } from '../../logger/logger-admin.js';
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
 */
export async function putEventService(eventId: number, userId?: string) {
  // Запрос данных Event (eventId) с API Zwift
  const event = await getEventZwiftService(eventId);

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
  await putSignedRidersService({ eventId, clubId: eventSaved.microserviceExternalResourceId });

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
