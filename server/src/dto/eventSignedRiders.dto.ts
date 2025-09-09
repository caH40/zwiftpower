// types
import { EventSignedRidersFetch } from '../common/types/eventSignedRiders.interface.js';
import { EventWithSignedRiders } from '../types/types.interface.js';

/**
 * DTO для отправки данных Event и зарегистрированных райдеров
 */
export const eventSignedRidersDto = (event: EventWithSignedRiders) => {
  const seriesId = {
    _id: String(event.seriesId._id),
    name: event.seriesId.name,
    urlSlug: event.seriesId.urlSlug,
  };
  const eventForFetch: Omit<EventSignedRidersFetch, 'seriesId'> & {
    seriesId: { _id: string; name: string; urlSlug: string };
  } = { ...event, seriesId };
  delete eventForFetch.totalEntrantCount;
  delete eventForFetch.totalJoinedCount;

  return eventForFetch;
};
