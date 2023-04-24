import { ZwiftEvent } from '../../Model/ZwiftEvent.js';

export async function getEventService(eventId) {
  try {
    const eventDataDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    return { event: eventDataDB };
  } catch (error) {
    throw error;
  }
}
export async function getEventsService(isFinished) {
  try {
    const eventsDB = await ZwiftEvent.find({ hasResults: isFinished }).populate(
      'eventSubgroups'
    );
    // сортировка заездов по возрастанию даты старта
    eventsDB.sort(
      (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
    );
    return { events: eventsDB, message: 'Получены все заезды' };
  } catch (error) {
    throw error;
  }
}
