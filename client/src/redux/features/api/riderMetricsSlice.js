import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { serverExpress } from '../../../config/environment';

export const fetchRiderMetrics = createAsyncThunk(
  'riderMetricsGet/profile',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/profile/${zwiftId}/metrics`,
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

const riderMetricsSlice = createSlice({
  name: 'powerCurve',
  initialState: {
    metrics: [],

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRiderMetrics.pending, (state) => {
      state.metrics = [];
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRiderMetrics.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      state.metrics = action.payload.data;
    });
    builder.addCase(fetchRiderMetrics.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default riderMetricsSlice.reducer;
