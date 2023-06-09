import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';

export async function getEventService(eventId) {
  try {
    const eventDataDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    if (!eventDataDB) return { event: [] };
    // поиск и добавление в массив всех зарегистрированных райдеров в подгруппы
    const signedRiders = [];
    for (const subgroup of eventDataDB.eventSubgroups) {
      const ridersInGroup = await ZwiftSignedRiders.find({ subgroup: subgroup._id });
      signedRiders.push(...ridersInGroup);
    }
    const eventData = eventDataDB.toObject();
    // сортировка групп по убыванию
    eventData.eventSubgroups.sort((a, b) => a.label - b.label);
    // сортировка списка райдеров по убыванию категории
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
export async function getEventsService(started, target, page = 1, docsOnPage = 20) {
  try {
    console.log({ started, target, page, docsOnPage });
    const eventsDB = await ZwiftEvent.find({ started }).populate('eventSubgroups');
    // сортировка заездов по возрастанию даты старта
    for (const event of eventsDB) {
      // сортировка групп по убыванию
      event.eventSubgroups.sort((a, b) => a.label - b.label);
    }

    // возвращаются только заезды, стартующие сегодня и завтра
    if (target === 'preview' && !started) {
      eventsDB.sort(
        (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
      );

      const events = eventsDB.filter((event) => {
        const dateToday = new Date().toLocaleDateString();

        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const dateTomorrow = new Date(Date.now() + millisecondsInDay).toLocaleDateString();
        const checkDate = (date) => new Date(date).toLocaleDateString();

        const notStarted = Date.now() < new Date(event.eventStart).getTime();
        const isToday = checkDate(event.eventStart) === dateToday;
        const isTomorrow = checkDate(event.eventStart) === dateTomorrow;

        if ((isToday || isTomorrow) && notStarted) return true;
        return false;
      });

      return { events, message: 'Получены все заезды' };
    }
    // console.log(eventsDB);
    eventsDB.sort((a, b) => {
      if (started) {
        return new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime();
      } else {
        return new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime();
      }
    });

    const quantityPages = Math.ceil(eventsDB.length / docsOnPage);

    const sliceStart = page * docsOnPage - docsOnPage;
    const sliceEnd = docsOnPage * page;
    const eventsFiltered = eventsDB.slice(sliceStart, sliceEnd);

    return { events: eventsFiltered, quantityPages, message: 'Получены все заезды' };
  } catch (error) {
    throw error;
  }
}
