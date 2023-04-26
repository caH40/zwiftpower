import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { putEventService } from './race/events-put.js';

export async function scheduleEvents() {
  try {
    const eventsDB = await ZwiftEvent.find({ started: false });
    for (const event of eventsDB) {
      await putEventService(event.id);
    }
  } catch (error) {
    console.error(error);
  }
}
// обновление параметров заездов в расписании (еще не стартовавших)
