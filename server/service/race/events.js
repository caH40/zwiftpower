import { PowerCurve } from '../../Model/PowerCurve.js';
import { Series } from '../../Model/Series.js';
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

    // добавление powerCurve каждому райдеру
    const signedRidersArray = signedRiders.map((s) => s.toObject());
    const powerCurvesDB = await PowerCurve.find();

    for (const rider of signedRidersArray) {
      rider.powerCurve = powerCurvesDB.find((cp) => cp.zwiftId === rider.id);
    }

    eventData.signedRiders = signedRidersArray;

    return { event: eventData };
  } catch (error) {
    throw error;
  }
}
// получение всех эвентов для расписания (started:false) или для списка эвентов с результатами
export async function getEventsService(started, target, page = 1, docsOnPage = 20, search) {
  try {
    const eventsDB = await ZwiftEvent.find({ started })
      .populate('eventSubgroups')
      .populate('seriesId');

    // фильтрация по имени
    const eventsFiltered = getEventsFiltered(eventsDB, search);

    // сортировка заездов по возрастанию даты старта
    for (const event of eventsFiltered) {
      // сортировка групп по убыванию
      event.eventSubgroups.sort((a, b) => a.label - b.label);
    }

    // возвращаются только заезды, стартующие сегодня и завтра
    if (target === 'preview' && !started) {
      eventsFiltered.sort(
        (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
      );

      const events = eventsFiltered.filter((event) => {
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

    eventsFiltered.sort((a, b) => {
      if (started) {
        return new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime();
      } else {
        return new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime();
      }
    });

    const quantityPages = Math.ceil(eventsFiltered.length / docsOnPage);

    const sliceStart = page * docsOnPage - docsOnPage;
    const sliceEnd = docsOnPage * page;
    const eventsSliced = eventsFiltered.slice(sliceStart, sliceEnd);

    return { events: eventsSliced, quantityPages, message: 'Получены все заезды' };
  } catch (error) {
    throw error;
  }
}

// фильтрация по названию найденных Эвентов согласно поисковому запросу search
function getEventsFiltered(events, search) {
  try {
    const eventsFiltered = events.filter((event) => {
      if (!search) return true;
      if (event.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return true;
      return false;
    });
    return eventsFiltered;
  } catch (error) {
    throw error;
  }
}
