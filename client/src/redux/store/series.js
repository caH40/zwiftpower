import seriesOrganizerSlice from '../features/api/series/seriesSlice';
import seriesPublicSlice from '../features/api/series/seriesPublicSlice';

export const seriesOrganizerReducers = {
  seriesOrganizer: seriesOrganizerSlice,
};

export const seriesPublicReducers = {
  seriesPublic: seriesPublicSlice,
};
