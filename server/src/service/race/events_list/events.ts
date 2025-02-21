import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

import { getEventsFiltered } from './events-filter.js';

// types
import { GetEvents } from '../../../types/http.interface.js';
import { EventWithSubgroupAndSeries } from '../../../types/types.interface.js';
import { eventsForSeriesDto, eventsListDto } from '../../../dto/eventsList.dto.js';
import { TEventsForSeriesResponseDB } from '../../../types/mongodb-response.types.js';
import { TEventsForSeriesDto } from '../../../types/dto.interface.js';

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
    .populate({ path: 'organizerId', select: ['logoFileInfo', '_id', 'name', 'shortName'] })
    .lean<EventWithSubgroupAndSeries[]>();

  // Фильтрация по имени
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

/**
 * Получение всех эвентов Организатора для добавления в серию заездов.
 */
export async function getEventsForSeriesService({
  organizerId,
}: {
  organizerId?: string;
}): Promise<TEventsForSeriesDto[]> {
  // Получение Эвентов, которые не включены в Серии.
  const eventsDB = await ZwiftEvent.find(
    { organizerId, seriesId: null },
    {
      name: true,
      eventStart: true,
    }
  ).lean<TEventsForSeriesResponseDB[]>();

  // Сортировка, сначала те Эвенты, которые стартуют раньше
  eventsDB.sort((a, b) => {
    return new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime();
  });

  return eventsForSeriesDto(eventsDB);
}
