// id:eventId получение результатов эвента
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { serverExpress } from '../../../config/environment';

export const fetchResultEvent = createAsyncThunk(
  'eventGet/fetchResultEvent',
  async function (eventId, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/results/${eventId}`,
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

const eventResultSlice = createSlice({
  name: 'eventGet',
  initialState: {
    eventData: {},
    resultsRow: [],
    resultsPrepared: [],
    status: null,
    error: null,
  },
  reducers: {
    resetResults: (state) => {
      state.eventData = {};
      state.resultsRow = [];
      state.resultsPrepared = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResultEvent.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchResultEvent.fulfilled, (state, action) => {
      state.status = 'resolved';
      const { results, ...eventRow } = action.payload;

      state.resultsPrepared = results;
      state.resultsRow = results;
      state.eventData = eventRow;
    });
    builder.addCase(fetchResultEvent.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetResults } = eventResultSlice.actions;

export default eventResultSlice.reducer;
