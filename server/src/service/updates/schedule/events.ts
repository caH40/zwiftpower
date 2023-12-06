import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { errorHandler } from '../../../errors/error.js';
import { putEventService } from '../../race/events-put.js';

// types
import { ZwiftEventSchema } from '../../../types/model.interface.js';

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
