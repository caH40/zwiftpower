import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

/**
 * удаление логов ошибок, перечисленных в массиве ids
 */
export const fetchLogDeleteError = createAsyncThunk(
  'logsDelete/logError',
  async function (ids, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/logs/errors',
        method: 'delete',
        data: ids,
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );
      return true;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const logErrorDeleteSlice = createSlice({
  name: 'logErrorDelete',
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogDeleteError.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogDeleteError.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });
    builder.addCase(fetchLogDeleteError.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default logErrorDeleteSlice.reducer;
