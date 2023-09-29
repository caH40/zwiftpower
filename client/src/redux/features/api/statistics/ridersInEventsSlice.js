import { createSlice } from '@reduxjs/toolkit';

import { filterForMonth } from '../../../../hook/chart/riders/filter-month';
import { filterForWeek } from '../../../../hook/chart/riders/filter-week';
import { filterForDay } from '../../../../hook/chart/riders/filter-day';

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

    // обработка результатов согласно периода запроса
    getRidersInEventsPrepared(state, action) {
      const periodCurrent = action.payload;
      switch (periodCurrent) {
        case '3 месяца':
          state.ridersInEventsPrepared = filterForWeek(state.ridersInEvents);
          break;
        case '30 дней':
          state.ridersInEventsPrepared = filterForDay(state.ridersInEvents);
          break;
        default:
          state.ridersInEventsPrepared = filterForMonth(state.ridersInEvents);
          break;
      }
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

export const { resetRidersInEvents, getRidersInEventsPrepared } = ridersInEventsSlice.actions;
export default ridersInEventsSlice.reducer;
