import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { errorHandler } from '../../errors/error.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

export async function checkDurationUpdating(event: EventWithSubgroup) {
  try {
    const millisecondsIn2Hours = 2 * 60 * 60 * 1000; // длительность обновления результатов
    const eventStart = new Date(event.eventStart).getTime();
    const timeCurrent = new Date().getTime();
    if (timeCurrent - eventStart > millisecondsIn2Hours) {
      event.hasResults = true;
      await ZwiftEvent.findOneAndUpdate({ _id: event._id }, { $set: { hasResults: true } });
    }
  } catch (error) {
    errorHandler(error);
  }
}
