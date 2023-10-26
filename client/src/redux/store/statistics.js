import leadersInIntervalsSlice from '../features/api/leadersInIntervals/leadersInIntervalsSlice';
import ridersTotalFTPSlice from '../features/api/statistics-ftp/ridersTotalFTPSlice';
import ridersInEventsSlice from '../features/api/statistics/ridersInEventsSlice';

export const statisticsReducers = {
  ridersInEventsFetch: ridersInEventsSlice,
  leadersInIntervalsFetch: leadersInIntervalsSlice,
  ridersTotalFTPFetch: ridersTotalFTPSlice,
};
