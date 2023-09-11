// types
import { EventSignedRidersFetch } from '../common/types/eventSignedRiders.interface.js';
import { EventWithSignedRiders } from '../types/types.interface.js';

/**
 * DTO для отправки данных Event и зарегистрированных райдеров
 */
export const eventSignedRidersDto = (event: EventWithSignedRiders) => {
  const eventForFetch: EventSignedRidersFetch = { ...event };
  delete eventForFetch.microserviceExternalResourceId;
  delete eventForFetch.totalEntrantCount;
  delete eventForFetch.totalJoinedCount;

  return eventForFetch;
};
