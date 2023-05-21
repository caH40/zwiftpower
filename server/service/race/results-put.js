import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { loggingAdmin } from '../log.js';
import { updateResultsEvent } from '../updates/results-events.js';

// ручное обновление результатов по запросу модератора
export async function putResultsService(eventId, userId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    await updateResultsEvent(eventDB);
    // логирование действия
    if (userId) {
      const description = 'updateEventResultsInDB';
      const { id, name, eventStart } = eventDB;
      await loggingAdmin(id, name, eventStart, userId, description);
    }

    return { message: `Обновлены результаты заезда "${eventDB.name}"` };
  } catch (error) {
    throw error;
  }
}
