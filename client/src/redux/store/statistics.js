import leadersInIntervalsSlice from '../features/api/leadersInIntervals/leadersInIntervalsSlice';
import ridersTotalFTPSlice from '../features/api/statistics-ftp/ridersTotalFTPSlice';
import ridersInEventsSlice from '../features/api/statistics/ridersInEventsSlice';
import ridersTotalAgeSlice from '../features/api/statistics_age/ridersTotalAgeSlice';

export const statisticsReducers = {
  ridersInEventsFetch: ridersInEventsSlice,
  leadersInIntervalsFetch: leadersInIntervalsSlice,
  ridersTotalFTPFetch: ridersTotalFTPSlice,
  ridersTotalAgeFetch: ridersTotalAgeSlice,
};
