import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchEvents = createAsyncThunk(
  'eventsGet/fetchEvents',
  async function (started, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/events?started=${started}`,
        method: 'get',
      });
      return { data: response.data.events, started };
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const eventsSlice = createSlice({
  name: 'eventsGet',
  initialState: {
    eventsPreview: [],
    eventsResults: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      if (action.payload.started) {
        state.eventsResults = action.payload.data;
      } else {
        state.eventsPreview = action.payload.data;
      }
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetEventData } = eventsSlice.actions;

export default eventsSlice.reducer;
