// started:false получения списка расписания предстоящих эвентов
// started:true получения списка эвентов которые уже стартовали
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { myAxios } from '../../../api/axios';
import { serverExpress } from '../../../config/environment';

import { handlerErrorAsyncThunk } from './utils/handler-error';

export const fetchEvents = createAsyncThunk(
  'eventsGet/fetchEvents',
  async function ({ target, started, page, docsOnPage, search, organizerId }, thunkAPI) {
    try {
      const targetCurrent = target ? `&target=${target}` : '';
      const pageStr = page ? `&page=${page}` : '';
      const docsOnPageStr = docsOnPage ? `&docsOnPage=${docsOnPage}` : '';
      const searchStr = search ? `&search=${search}` : '';
      const organizerIdStr = organizerId ? `&organizerId=${organizerId}` : '';

      const query = `started=${started}${targetCurrent}${pageStr}${docsOnPageStr}${searchStr}${organizerIdStr}`;

      const response = await axios({
        url: `${serverExpress}/api/race/events?${query}`,
        method: 'get',
      });
      return {
        events: response.data.events,
        quantityPages: response.data.quantityPages,
        started: started,
        target: target,
      };
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Запрос на получение Эвентов Организатора для добавления в Серии заездов.
 */
export const fetchEventsForSeries = createAsyncThunk(
  'eventsGet/fetchEventsForSeries',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series/events`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

const eventsSlice = createSlice({
  name: 'eventsGet',
  initialState: {
    eventsPreview: [],
    eventsSchedule: [],
    eventsResults: [],
    quantityPages: 0,
    eventsForSeries: [],

    status: null,
    error: null,
  },
  reducers: {
    resetEventsPreview: (state) => {
      state.eventsPreview = [];
    },
    resetEventsSchedule: (state) => {
      state.eventsSchedule = [];
      state.quantityPages = 0;
    },
    resetEventsResults: (state) => {
      state.eventsResults = [];
      state.quantityPages = 0;
    },
    resetEventsForSeries: (state) => {
      state.eventsForSeries = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      if (action.payload.target === 'preview') {
        state.eventsPreview = action.payload.events;
      }
      if (action.payload.started) {
        state.eventsResults = action.payload.events;
      } else {
        state.eventsSchedule = action.payload.events;
      }
      state.quantityPages = +action.payload.quantityPages;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ======================= Эвенты для добавления в Серии =======================
    builder.addCase(fetchEventsForSeries.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchEventsForSeries.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      state.eventsForSeries = action.payload.data;
    });
    builder.addCase(fetchEventsForSeries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const {
  resetEventData,
  resetEventsPreview,
  resetEventsSchedule,
  resetEventsResults,
  resetEventsForSeries,
} = eventsSlice.actions;

export default eventsSlice.reducer;
