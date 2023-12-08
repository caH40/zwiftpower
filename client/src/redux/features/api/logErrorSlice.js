import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

export const fetchLogError = createAsyncThunk(
  'logsGet/logError',
  async function (id, thunkAPI) {
    try {
      const query = `id=${id}`;
      const response = await myAxios({
        url: `/api/logs/error?${query}`,
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

const logErrorSlice = createSlice({
  name: 'logError',
  initialState: {
    log: null,

    status: null,
    error: null,
  },
  reducers: {
    resetLogError: (state) => {
      state.log = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogError.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogError.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.log = action.payload;
    });
    builder.addCase(fetchLogError.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetLogError } = logErrorSlice.actions;

export default logErrorSlice.reducer;
