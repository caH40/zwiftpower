import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { loggingAdmin } from '../log.js';
import { updateResultsEvent } from '../updates/results_event/result-event.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Ручное обновление результатов по запросу модератора
 */
export async function putResultsService(eventId: number, userId: string) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({ id: eventId }).populate(
    'eventSubgroups'
  );

  if (!eventDB) {
    throw new Error(`Не найден Эвент ${eventId} для удаления из БД`);
  }

  await updateResultsEvent(eventDB);

  // логирование действия
  if (userId) {
    const description = 'updateEventResultsInDB';
    const { id, name, eventStart } = eventDB;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { message: `Обновлены результаты заезда "${eventDB.name}"` };
}
