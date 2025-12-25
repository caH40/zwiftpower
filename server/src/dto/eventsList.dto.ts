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
export const eventsListDto = ({
  events,
  quantityPages,
  message,
}: EventsListDtoArg): {
  events: TEventWithSubgroupDto[];
  quantityPages: number | undefined;
  message: string;
} => {
  const eventsForFetch = events.map((event) => {
    const seriesId = {
      ...event.seriesId,
      logoFileInfo: createUrlsToFileCloud(event.seriesId?.logoFileInfo),
    };

    const organizerId = event.organizerId && {
      logoUrls: createUrlsToFileCloud(event.organizerId.logoFileInfo),
      _id: String(event.organizerId._id),
      name: event.organizerId.name,
      shortName: event.organizerId.shortName,
      urlSlug: event.organizerId.urlSlug,
    };

    return { ...event, seriesId, organizerId };
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
