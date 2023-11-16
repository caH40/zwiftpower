import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { errorHandler } from '../../errors/error.js';
import { putEventService } from '../race/events-put.js';

// types
import { ZwiftEventSchema } from '../../types/model.interface.js';

/**
 * Изменение свойства started, если заезд стартовал
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

/**
 * Обновление параметров заездов в расписании (еще не стартовавших)
 */
export async function updateScheduleEvents() {
  try {
    const eventsDB: ZwiftEventSchema[] = await ZwiftEvent.find({ started: false });
    for (const event of eventsDB) {
      await putEventService(event.id);
    }
  } catch (error) {
    errorHandler(error);
  }
}
