import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

export const fetchResultsJson = createAsyncThunk(
  'eventResults/fetchResultsJson',
  async function ({ eventId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `/api/zwift/download/event-results/${eventId}`,
        method: 'get',
        responseType: 'blob', // для получения информации с сервера файлом
      });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'results.json');
      document.body.appendChild(link);
      link.click();

      return [];
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
const downloadResultsSlice = createSlice({
  name: 'downloadResults',
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResultsJson.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchResultsJson.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });
    builder.addCase(fetchResultsJson.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default downloadResultsSlice.reducer;
