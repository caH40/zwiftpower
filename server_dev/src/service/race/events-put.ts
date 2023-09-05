import { loggingAdmin } from '../log.js';
import { getEventZwiftService } from '../zwift/events.js';
import { deleteEventService } from './events-delete.js';
import { postEventService } from './events-post.js';

// types
import { AdditionalParamsEvent, EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Обновление данных Эвента и зарегистрированных райдеров в БД после запроса из API Zwift
 */
export async function putEventService(eventId: number, userId: string) {
  /**
   * Запрос данных Event (eventId) с API Zwift
   */
  const event = await getEventZwiftService(eventId, userId);

  /**
   * Удаление Event в БД чтобы сохранить Event с обновленными (свежими) данными
   */
  const additionalParams: AdditionalParamsEvent = await deleteEventService(eventId);

  const eventWithSubgroup: EventWithSubgroup = { ...event, ...additionalParams };

  await postEventService(eventWithSubgroup, userId);
  // логирование действия
  if (userId) {
    const description = 'updateEventInDB';
    const { id, name, eventStart } = event;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { message: `Обновлены данные ${event.name}` };
}
