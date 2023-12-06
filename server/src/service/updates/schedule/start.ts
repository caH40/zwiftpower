import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { errorHandler } from '../../../errors/error.js';
import { updateStartInfoEvent } from './start-event.js';

/**
 * Запуск изменения свойства started в Эвентах в расписании
 */
export async function updateStartInfo() {
  try {
    const eventsDB = await ZwiftEvent.find({ started: false });

    for (const event of eventsDB) {
      await updateStartInfoEvent(event);
    }
  } catch (error) {
    errorHandler(error);
  }
}
