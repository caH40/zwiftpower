import { createSlice } from '@reduxjs/toolkit';

import { filterForMonth } from '../../../../hook/chart/riders/filter-year';

import { fetchRidersInEvents } from './fetchRidersInEvents';

const initialState = {
  ridersInEvents: [],
  ridersInEventsPrepared: [],
  status: null,
  error: null,
};

const ridersInEventsSlice = createSlice({
  name: 'ridersInEvents',
  initialState,
  reducers: {
    resetRidersInEvents(state) {
      state.ridersInEvents = [];
    },
    setPeriods(state, action) {
      // необходимый период
      const periodCurrent = action.payload;
      state.periods = state.ridersInEvents.map((elm) => elm.startEvent);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRidersInEvents.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchRidersInEvents.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.ridersInEvents = action.payload.ridersInEvents;

      // группирование данных по месяцам
      const dataPreparedFiltered = filterForMonth(action.payload.ridersInEvents);
      state.ridersInEventsPrepared = dataPreparedFiltered;
    });

    builder.addCase(fetchRidersInEvents.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetRidersInEvents } = ridersInEventsSlice.actions;
export default ridersInEventsSlice.reducer;
