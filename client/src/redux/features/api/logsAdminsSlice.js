import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

export const fetchLogsAdmins = createAsyncThunk(
  'logsGet/logsAdmins',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/logs/admin',
        method: 'get',
      });

      return response.data.logs;
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

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogsAdmins.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogsAdmins.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.logs = action.payload;
    });
    builder.addCase(fetchLogsAdmins.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { getLogs } = logsAdminsSlice.actions;

export default logsAdminsSlice.reducer;
