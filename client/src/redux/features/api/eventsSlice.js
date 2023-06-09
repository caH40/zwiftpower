// started:false получения списка расписания предстоящих эвентов
// started:true получения списка эвентов которые уже стартовали
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchEvents = createAsyncThunk(
  'eventsGet/fetchEvents',
  async function ({ target, started, page, docsOnPage }, thunkAPI) {
    try {
      const targetCurrent = target ? `&target=${target}` : '';
      const pageStr = page ? `&page=${page}` : '';
      const docsOnPageStr = docsOnPage ? `&docsOnPage=${docsOnPage}` : '';

      const query = `started=${started}${targetCurrent}${pageStr}${docsOnPageStr}`;
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
    quantityPages: 0,

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.error = null;
      state.eventsPreview = [];
      state.eventsSchedule = [];
      state.eventsResults = [];
      state.quantityPages = 0;
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
  },
});

export const { resetEventData } = eventsSlice.actions;

export default eventsSlice.reducer;
