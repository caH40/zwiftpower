import { createUrlsToFileCloud } from '../utils/url.js';

// types
import { TEventsForSeriesDto, TEventWithSubgroupDto } from '../types/dto.interface.js';
import { EventsListDtoArg } from '../types/types.interface.js';
import { TEventsForSeriesResponseDB } from '../types/mongodb-response.types.js';

/**
 *  Массив Events для страниц расписания, анонса или результатов
 */
export const eventsListDto = ({ events, quantityPages, message }: EventsListDtoArg) => {
  const eventsForFetch: TEventWithSubgroupDto[] = events.map((event) =>
    Object.entries(event).reduce((acc, [key, values]) => {
      if (key === 'organizerId') {
        acc.logoFileInfo = createUrlsToFileCloud(event.organizerId?.logoFileInfo);
        acc.organizerId = event.organizerId?._id && String(event.organizerId._id);
      } else if (key !== '__v') {
        acc[key] = values;
      }
      return acc;
    }, {} as TEventWithSubgroupDto)
  );

  return { events: eventsForFetch, quantityPages, message };
};

/**
 * DTO данных по Эвентам организатора для добавления/удаления в Серию.
 */
export function eventsForSeriesDto(
  events: TEventsForSeriesResponseDB[]
): TEventsForSeriesDto[] {
  return events.map((event) => ({
    ...event,
    _id: String(event._id),
  }));
}
