// started:false получения списка расписания предстоящих эвентов
// started:true получения списка эвентов которые уже стартовали
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchEvents = createAsyncThunk(
  'eventsGet/fetchEvents',
  async function (options, thunkAPI) {
    try {
      const target = options.target ? `&target=${options.target}` : '';
      const response = await axios({
        url: `${serverExpress}/api/race/events?started=${options.started}${target}`,
        method: 'get',
      });
      return { data: response.data.events, started: options.started, target: options.target };
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
    eventsSchedule: [],
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

      if (action.payload.target === 'preview') {
        state.eventsPreview = action.payload.data;
      }
      if (action.payload.started) {
        state.eventsResults = action.payload.data;
      } else {
        state.eventsSchedule = action.payload.data;
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
