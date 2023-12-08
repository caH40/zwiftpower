import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

export const fetchLogsAdmins = createAsyncThunk(
  'logsGet/logsAdmins',
  async function ({ page, docsOnPage, search }, thunkAPI) {
    try {
      const query = `docsOnPage=${docsOnPage}&page=${page}&search=${search}`;
      const response = await myAxios({
        url: `/api/logs/admin?${query}`,
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

const logsAdminsSlice = createSlice({
  name: 'logsAdmins',
  initialState: {
    logs: [],
    quantityPages: 0,

    status: null,
    error: null,
  },
  reducers: {
    resetLogsAdmins: (state) => {
      state.logs = [];
      state.quantityPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogsAdmins.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogsAdmins.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.logs = action.payload.logs;
      state.quantityPages = +action.payload.quantityPages;
    });
    builder.addCase(fetchLogsAdmins.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetLogsAdmins } = logsAdminsSlice.actions;

export default logsAdminsSlice.reducer;
