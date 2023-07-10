import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchSeries = createAsyncThunk('seriesGet/fetch', async function (_, thunkAPI) {
  try {
    const response = await axios({ url: `${serverExpress}/api/race/series` });
    return { series: response.data };
  } catch (error) {
    const message = error.response.data.message || error.message;
    thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
    return thunkAPI.rejectWithValue({ message });
  }
});

const seriesSlice = createSlice({
  name: 'series',
  initialState: {
    series: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeries.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchSeries.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.series = action.payload.series;
    });
    builder.addCase(fetchSeries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default seriesSlice.reducer;
