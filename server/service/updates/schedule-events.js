import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { putEventService } from '../race/events-put.js';

// изменение свойства started, если заезд стартовал
export async function updateStartInfo() {
  try {
    console.log('----2 запуск  updateStartInfo()');
    const eventsDB = await ZwiftEvent.find({ started: false });

    for (const event of eventsDB) {
      await updateStartInfoEvent(event);
    }
  } catch (error) {
    throw error;
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
    throw error;
  }
}

// обновление параметров заездов в расписании (еще не стартовавших)
export async function updateScheduleEvents() {
  try {
    console.log('----1 запуск updateScheduleEvents()');
    const eventsDB = await ZwiftEvent.find({ started: false });
    for (const event of eventsDB) {
      await putEventService(event.id);
    }
  } catch (error) {
    throw error;
  }
}
