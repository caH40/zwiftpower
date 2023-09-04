import { ZwiftEvent } from '../../Model/ZwiftEvent.js';

// types
import { GetEvents } from '../../types/http.interface.js';

/**
 * получение всех эвентов для расписания (started:false) или для списка эвентов с результатами
 */
export async function getEventsService({
  started,
  target,
  page = 1,
  docsOnPage = 20,
  search,
}: GetEvents) {
  try {
    const isStarted = started === 'true' ? true : false;

    const eventsDB = await ZwiftEvent.find({ isStarted })
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
    if (target === 'preview' && !isStarted) {
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
      if (isStarted) {
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
    console.log(error);
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
    console.log(error);
  }
}
