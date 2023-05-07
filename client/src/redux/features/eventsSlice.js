import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from './alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchEvents = createAsyncThunk(
  'eventData/fetchEvents',
  async function (started, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/events?started=${started}`,
        method: 'get',
      });
      return response.data.events;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const eventsSlice = createSlice({
  name: 'eventsData',
  initialState: {
    events: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.events = [];
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.events = action.payload;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default eventsSlice.reducer;
