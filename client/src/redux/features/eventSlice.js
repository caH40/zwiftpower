import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { prepareResults } from '../../Pages/RaceResultsDescription/service';

import { getAlert } from './alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchEvent = createAsyncThunk(
  'eventData/fetchEvent',
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

const eventSlice = createSlice({
  name: 'eventData',
  initialState: {
    eventData: {},
    resultsRow: [],
    resultsPrepared: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvent.pending, (state) => {
      state.resultsPrepared = [];
      state.eventData = [];
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchEvent.fulfilled, (state, action) => {
      state.status = 'resolved';
      const { results, ...eventRow } = action.payload;
      const resultsPrepared = prepareResults(results);

      state.resultsPrepared = resultsPrepared;
      state.resultsRow = results;
      state.eventData = eventRow;
    });
    builder.addCase(fetchEvent.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default eventSlice.reducer;
