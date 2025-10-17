// types
import { EventSignedRidersFetch } from '../common/types/eventSignedRiders.interface.js';
import {
  CpBestEffortsAdditional,
  EventWithSignedRiders,
  TSignedRidersWithTeam,
} from '../types/types.interface.js';

/**
 * DTO для отправки данных Event и зарегистрированных райдеров
 */
export const eventSignedRidersDto = (
  event: EventWithSignedRiders,
  signedRidersPowerCurves: (TSignedRidersWithTeam & {
    racingScore: number;
    cpBestEfforts: CpBestEffortsAdditional[] | undefined;
  })[]
) => {
  const seriesId = event.seriesId && {
    _id: String(event.seriesId._id),
    name: event.seriesId.name,
    urlSlug: event.seriesId.urlSlug,
  };

  const signedRiders = signedRidersPowerCurves.map((r) => {
    const team = r.team && {
      name: r.team.name,
      shortName: r.team.shortName,
      urlSlug: r.team.urlSlug,
      appearance: r.team.appearance,
    };
    return { ...r, team };
  });

  const eventForFetch: Omit<EventSignedRidersFetch, 'seriesId'> & {
    seriesId: { _id: string; name: string; urlSlug: string };
  } = { ...event, seriesId, signedRiders };

  delete eventForFetch.totalEntrantCount;
  delete eventForFetch.totalJoinedCount;

  return eventForFetch;
};
