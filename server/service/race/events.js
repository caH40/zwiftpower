import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';

export async function getEventService(eventId) {
  try {
    const eventDataDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    // поиск и добавление в массив всех зарегистрированных райдеров в подгруппы
    const signedRiders = [];
    for (const subgroup of eventDataDB.eventSubgroups) {
      const ridersInGroup = await ZwiftSignedRiders.find({ subgroup: subgroup._id });
      signedRiders.push(...ridersInGroup);
    }
    const eventData = eventDataDB.toObject();
    // сортировка по убыванию категорий групп
    signedRiders.sort((a, b) =>
      a.subgroupLabel.toLowerCase().localeCompare(b.subgroupLabel.toLowerCase())
    );

    eventData.signedRiders = signedRiders;

    return { event: eventData };
  } catch (error) {
    throw error;
  }
}
// получение всех эвентов для расписания (started:false) или для списка евентов с результатами
export async function getEventsService(started) {
  try {
    const eventsDB = await ZwiftEvent.find({ started }).populate('eventSubgroups');
    // сортировка заездов по возрастанию даты старта
    eventsDB.sort((a, b) => {
      if (started) {
        return new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime();
      } else {
        return new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime();
      }
    });
    return { events: eventsDB, message: 'Получены все заезды' };
  } catch (error) {
    throw error;
  }
}
