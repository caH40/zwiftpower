import { createUrlsToFileCloud } from '../utils/url.js';

// types
import {
  TEventForMailingPreviewDto,
  TEventsForSeriesDto,
  TEventWithSubgroupDto,
} from '../types/dto.interface.js';
import { EventsListDtoArg } from '../types/types.interface.js';
import {
  TEventForMailingPreviewDB,
  TEventsForSeriesResponseDB,
} from '../types/mongodb-response.types.js';

/**
 *  Массив Events для страниц расписания, анонса или результатов
 */
export const eventsListDto = ({ events, quantityPages, message }: EventsListDtoArg) => {
  const eventsForFetch: TEventWithSubgroupDto[] = events.map((event) => {
    const currentEvent = {} as TEventWithSubgroupDto;

    const logoFileInfo = createUrlsToFileCloud(event.seriesId?.logoFileInfo);

    currentEvent.seriesId = { ...event.seriesId, logoFileInfo };

    currentEvent.logoFileInfo = createUrlsToFileCloud(event.organizerId?.logoFileInfo);
    currentEvent.organizerId = event.organizerId?._id && String(event.organizerId._id);

    // return Object.entries(event).reduce((acc, [key, values]) => {
    //   if (key === 'organizerId') {
    //     acc.logoFileInfo = createUrlsToFileCloud(event.organizerId?.logoFileInfo);
    //     acc.organizerId = event.organizerId?._id && String(event.organizerId._id);
    //   } else if (key !== '__v') {
    //     acc[key] = values;
    //   }
    //   return acc;
    // }, {} as TEventWithSubgroupDto);

    return { ...event, ...currentEvent };
  });

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

export function eventsForMailingPreviewDto(
  event: TEventForMailingPreviewDB
): TEventForMailingPreviewDto {
  const _id = event._id!.toString();

  const seriesId = event.seriesId?._id && {
    _id: event.seriesId._id.toString(),
    name: event.seriesId.name,
    urlSlug: event.seriesId.urlSlug,
    posterUrls: createUrlsToFileCloud(event.seriesId.posterFileInfo),
  };

  const organizerId = event.organizerId?._id && {
    _id: event.organizerId._id.toString(),
    name: event.organizerId.name,
    urlSlug: event.organizerId.urlSlug,
    logoUrls: createUrlsToFileCloud(event.organizerId.logoFileInfo),
  };

  return { ...event, _id, seriesId, organizerId };
}
