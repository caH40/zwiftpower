import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { putEventService } from '../race/events-put.js';

// изменение свойства started, если заезд стартовал
export async function updateStartInfo() {
  try {
    const eventsDB = await ZwiftEvent.find({ started: false });

    for (const event of eventsDB) {
      await updateStartInfoEvent(event);
    }
  } catch (error) {
    console.error(error);
  }
}

// обновление свойства старта заезда в одном event
export async function updateStartInfoEvent(event) {
  try {
    const startTime = new Date(event.eventStart).getTime();
    if (startTime < Date.now()) {
      await ZwiftEvent.findByIdAndUpdate(event._id, { $set: { started: true } });
    }
  } catch (error) {
    console.error(error);
  }
}

// обновление параметров заездов в расписании (еще не стартовавших)
export async function updateScheduleEvents() {
  try {
    const eventsDB = await ZwiftEvent.find({ started: false });
    for (const event of eventsDB) {
      await putEventService(event.id);
    }
  } catch (error) {
    console.error(error);
  }
}
