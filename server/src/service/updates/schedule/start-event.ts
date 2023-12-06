import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { errorHandler } from '../../../errors/error.js';

// types
import { ZwiftEventSchema } from '../../../types/model.interface.js';
/**
 * Обновление свойства старта заезда в одном event
 */
export async function updateStartInfoEvent(event: ZwiftEventSchema) {
  try {
    const startTime = new Date(event.eventStart).getTime();
    if (startTime < Date.now()) {
      await ZwiftEvent.findByIdAndUpdate(event._id, { $set: { started: true } });
    }
  } catch (error) {
    errorHandler(error);
  }
}
