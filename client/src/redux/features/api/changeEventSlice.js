// удаления Эвента и соответствующих результатов
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

export const fetchChangeEvent = createAsyncThunk(
  'event/fetchEventForChange',
  async function ({ operation, eventId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/race/events',
        method: operation,
        data: { eventId },
      });

      const { message } = response.data;
      thunkAPI.dispatch(getAlert({ message, type: 'success', isOpened: true }));
      return message;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const changeEventSlice = createSlice({
  name: 'changeEvent',
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChangeEvent.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchChangeEvent.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });
  },
});

export default changeEventSlice.reducer;
