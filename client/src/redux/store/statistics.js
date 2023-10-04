import leadersInIntervalsSlice from '../features/api/leadersInIntervals/leadersInIntervalsSlice';
import ridersInEventsSlice from '../features/api/statistics/ridersInEventsSlice';

export const statisticsReducers = {
  ridersInEventsFetch: ridersInEventsSlice,
  leadersInIntervalsFetch: leadersInIntervalsSlice,
};
