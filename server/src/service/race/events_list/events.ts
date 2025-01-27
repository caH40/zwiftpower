import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

import { getEventsFiltered } from './events-filter.js';

// types
import { GetEvents } from '../../../types/http.interface.js';
import { EventWithSubgroupAndSeries } from '../../../types/types.interface.js';
import { eventsListDto } from '../../../dto/eventsList.interface.js';

/**
 * получение всех эвентов для расписания (started:false) или для списка эвентов с результатами
 */
export async function getEventsService({
  started,
  target,
  page = 1,
  docsOnPage = 20,
  search,
  organizerId,
}: GetEvents) {
  const isStarted = started === 'true' ? true : false;

  const query = {
    started: isStarted,
    ...(organizerId && { organizerId }),
  };

  const eventsDB = await ZwiftEvent.find(query)
    .populate('eventSubgroups')
    .populate('seriesId')
    .lean<EventWithSubgroupAndSeries[]>();

  // console.log(eventsDB[0]);
  // console.log(eventsDB.length);

  // фильтрация по имени
  const eventsFiltered = getEventsFiltered(eventsDB, search);

  // сортировка групп по убыванию
  for (const event of eventsFiltered) {
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

      const checkDate = (date: string) => new Date(date).toLocaleDateString();

      const notStarted = Date.now() < new Date(event.eventStart).getTime();
      const isToday = checkDate(event.eventStart) === dateToday;
      const isTomorrow = checkDate(event.eventStart) === dateTomorrow;

      if ((isToday || isTomorrow) && notStarted) return true;
      return false;
    });

    return eventsListDto({ events, message: 'Получены все заезды' });
  }

  eventsFiltered.sort((a, b) => {
    if (isStarted) {
      return new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime();
    } else {
      return new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime();
    }
  });

  // пагинация
  const quantityPages = Math.ceil(eventsFiltered.length / docsOnPage);
  const sliceStart = page * docsOnPage - docsOnPage;
  const sliceEnd = docsOnPage * page;
  const eventsSliced = eventsFiltered.slice(sliceStart, sliceEnd);

  return eventsListDto({
    events: eventsSliced,
    quantityPages,
    message: 'Получены все заезды',
  });
}
