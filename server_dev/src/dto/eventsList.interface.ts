import { EventListFetch } from '../../../common/types/eventsList.interface.js';
import { EventsListDtoArg } from '../types/types.interface.js';

/**
 *  Массив Events для страниц расписания, анонса или результатов
 */
export const eventsListDto = ({ events, quantityPages, message }: EventsListDtoArg) => {
  const eventsForFetch: EventListFetch[] = events.map((event: EventListFetch) => {
    const seriesId = { ...event.seriesId };
    delete seriesId.descriptionShort;

    delete event.cullingType;
    delete event.microserviceExternalResourceId;
    delete event.totalEntrantCount;
    delete event.totalJoinedCount;

    return { ...event, ...seriesId };
  });
  return { events: eventsForFetch, quantityPages, message };
};
