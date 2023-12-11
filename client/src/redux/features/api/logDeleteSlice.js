import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

/**
 * удаление логов ошибок (логов модераторов), перечисленных в массиве ids
 */
export const fetchLogDelete = createAsyncThunk(
  'logsDelete/logError',
  async function ({ ids, path }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `/api/logs/${path}`,
        method: 'delete',
        data: ids,
      });

      thunkAPI.dispatch(
        getAlert({
          message: response.data.message,
          type: 'success',
          isOpened: true,
        })
      );
      return true;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const logDeleteSlice = createSlice({
  name: 'logDelete',
  initialState: {
    trigger: false,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogDelete.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchLogDelete.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
      state.trigger = !state.trigger;
    });
    builder.addCase(fetchLogDelete.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default logDeleteSlice.reducer;
