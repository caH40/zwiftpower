// id:eventId получение результатов эвента
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { prepareResults } from '../../../Pages/ResultsDescription/service';

import { getAlert } from '../alertMessageSlice';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResultEvent.pending, (state) => {
      state.resultsPrepared = [];
      state.eventData = [];
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchResultEvent.fulfilled, (state, action) => {
      state.status = 'resolved';
      const { results, ...eventRow } = action.payload;
      const resultsPrepared = prepareResults(results);

      state.resultsPrepared = resultsPrepared;
      state.resultsRow = results;
      state.eventData = eventRow;
    });
    builder.addCase(fetchResultEvent.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default eventResultSlice.reducer;
