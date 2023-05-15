import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { updateResultsEvent } from '../updates/results-events.js';

// ручное обновление результатов по запросу модератора
export async function putResultsService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    await updateResultsEvent(eventDB);
    return { message: `Обновлены результаты заезда "${eventDB.name}"` };
  } catch (error) {
    throw error;
  }
}
