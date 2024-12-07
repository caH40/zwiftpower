import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { loggingAdmin } from '../../logger/logger-admin.js';
import { updateResultsEvent } from '../updates/results_event/result-event.js';
import { getTokenForEvent } from './token.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Ручное обновление результатов Эвента по запросу модератора
 */
export async function putResultsService(eventId: number, userId: string) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({ id: eventId })
    .populate('eventSubgroups')
    .lean();

  if (!eventDB) {
    throw new Error(`Не найден Эвент ${eventId} для удаления из БД`);
  }

  const token = await getTokenForEvent({
    organizerLabel: eventDB.organizer,
    organizerId: eventDB.organizerId,
  });

  await updateResultsEvent(eventDB, token, false);

  // логирование действия
  if (userId) {
    const description = 'updateEventResultsInDB';
    const { id, name, eventStart } = eventDB;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }

  return { message: `Обновлены результаты заезда "${eventDB.name}"` };
}
