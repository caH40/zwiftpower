// id:eventId получение описания эвента с зарегистрированными райдерами
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { serverExpress } from '../../../config/environment';

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

const eventPreviewSlice = createSlice({
  name: 'eventGetPreview',
  initialState: {
    event: {},
    status: null,
    error: null,
  },
  reducers: {
    resetPreviewEventData: (state) => {
      state.event = {};
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
  },
});

export const { resetPreviewEventData } = eventPreviewSlice.actions;
export default eventPreviewSlice.reducer;
