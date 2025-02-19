import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { serverExpress } from '../../../config/environment';

export const fetchResultsSeries = createAsyncThunk(
  'resultsSeriesGet/fetchResults',
  async function ({ type, season }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/series/results/${type}/${season || 'none'}`,
        method: 'get',
      });

      return response.data;
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
    leaderboard: null,

    status: null,
    error: null,
  },
  reducers: {
    resetCatchData: (state) => {
      state.results = [];
      state.resultsSummary = [];
    },
  },
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
      state.leaderboard = action.payload.leaderboard;
    });
    builder.addCase(fetchResultsSeries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetCatchData } = resultsSeriesSlice.actions;

export default resultsSeriesSlice.reducer;
