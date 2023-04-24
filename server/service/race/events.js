import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSingedRiders } from '../../Model/ZwiftSingedRiders.js';

export async function getEventService(eventId) {
  try {
    const eventDataDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    // поиск и добавление в массив всех зарегистрированных райдеров в подгруппы
    const singedRiders = [];
    for (const subgroup of eventDataDB.eventSubgroups) {
      const ridersInGroup = await ZwiftSingedRiders.find({ subgroup: subgroup._id });
      singedRiders.push(...ridersInGroup);
    }
    const eventData = eventDataDB.toObject();
    // сортировка по убыванию категорий групп
    singedRiders.sort((a, b) =>
      a.subgroupLabel.toLowerCase().localeCompare(b.subgroupLabel.toLowerCase())
    );

    eventData.singedRiders = singedRiders;

    return { event: eventData };
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
