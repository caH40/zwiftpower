// id:eventId получение описания эвента с зарегистрированными райдерами
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { serverExpress } from '../../../config/environment';
import { myAxios } from '../../../api/axios';

export const fetchEventPreview = createAsyncThunk(
  'eventGetPreview/fetchEvent',
  async function (eventId, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/events/${eventId}`,
        method: 'get',
      });
      return response.data.event;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

/**
 * Данные предстоящих эвентов для рассылки на email.
 */
export const fetchGetEventsForMailing = createAsyncThunk(
  'eventGetPreviewForMailing/get',
  async ({ period = 'week' } = {}, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/events/mailings/preview/${period}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const eventPreviewSlice = createSlice({
  name: 'eventGetPreview',
  initialState: {
    event: {},
    eventsEmailPreview: [],
    status: null,
    error: null,
  },
  reducers: {
    resetPreviewEventData: (state) => {
      state.event = {};
    },
    resetEventsEmailPreview: (state) => {
      state.eventsEmailPreview = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventPreview.pending, (state) => {
      state.event = {};
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchEventPreview.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.error = null;
      state.event = action.payload;
    });
    builder.addCase(fetchEventPreview.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ======================= Данные предстоящих эвентов для рассылки на email =======================
    builder.addCase(fetchGetEventsForMailing.pending, (state) => {
      state.event = {};
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchGetEventsForMailing.fulfilled, (state, action) => {
      state.eventsEmailPreview = action.payload;
      state.status = 'resolved';
      state.error = null;
    });
    builder.addCase(fetchGetEventsForMailing.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetPreviewEventData, resetEventsEmailPreview } = eventPreviewSlice.actions;
export default eventPreviewSlice.reducer;
