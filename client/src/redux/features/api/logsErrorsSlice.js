import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

export const fetchLogsErrors = createAsyncThunk(
  'logsGet/logsErrors',
  async function ({ page, docsOnPage, search }, thunkAPI) {
    try {
      const query = `docsOnPage=${docsOnPage}&page=${page}&search=${search}`;
      const response = await myAxios({
        url: `/api/logs/errors?${query}`,
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

const logsErrorsSlice = createSlice({
  name: 'logsErrors',
  initialState: {
    logs: [],
    quantityPages: 0,

    status: null,
    error: null,
  },
  reducers: {
    resetLogsErrors: (state) => {
      state.logs = [];
      state.quantityPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogsErrors.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogsErrors.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.logs = action.payload.logs;
      state.quantityPages = +action.payload.quantityPages;
    });
    builder.addCase(fetchLogsErrors.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { getLogs, resetLogsErrors } = logsErrorsSlice.actions;

export default logsErrorsSlice.reducer;
