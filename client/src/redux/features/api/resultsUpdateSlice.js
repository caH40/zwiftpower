// запрос результатов эвета id:eventId из Звифта и обновление их в БД сайта зп.ру
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';

import { getAlert } from '../alertMessageSlice';

export const fetchUpdateResult = createAsyncThunk(
  'resultsUpdate/fetchUpdateResult',
  async function (eventId, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/race/results',
        method: 'put',
        data: { eventId },
      });

      const { message } = response.data;
      thunkAPI.dispatch(getAlert({ message, type: 'success', isOpened: true }));
      return message;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const resultsUpdateSlice = createSlice({
  name: 'resultsUpdate',
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateResult.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUpdateResult.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(fetchUpdateResult.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default resultsUpdateSlice.reducer;
