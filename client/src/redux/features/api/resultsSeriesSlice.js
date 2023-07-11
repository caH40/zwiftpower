import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchResultsSeries = createAsyncThunk(
  'resultsSeriesGet/fetchResults',
  async function ({ type, season }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/series/results/${type}/${season || 'none'}`,
        method: 'get',
      });
      return {
        results: response.data.results,
        resultsSummary: response.data.resultsSummary,
      };
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const resultsSeriesSlice = createSlice({
  name: 'resultsSeriesGet',
  initialState: {
    results: [],
    resultsSummary: [],

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResultsSeries.pending, (state) => {
      state.error = null;
      state.results = [];
      state.resultsSummary = [];
      state.status = 'loading';
    });
    builder.addCase(fetchResultsSeries.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.results = action.payload.results;
      state.resultsSummary = action.payload.resultsSummary;
    });
    builder.addCase(fetchResultsSeries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetEventData } = resultsSeriesSlice.actions;

export default resultsSeriesSlice.reducer;
