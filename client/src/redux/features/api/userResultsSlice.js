import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { setValueMax } from '../../../utils/value-max';
import { serverExpress } from '../../../config/environment';

/**
 * Запрос на получение результатов райдера
 */
export const fetchUserResults = createAsyncThunk(
  'userResultsGet/profile',
  async function ({ zwiftId, page, docsOnPage, columnName, isRasing }, thunkAPI) {
    try {
      const url = new URL(`${serverExpress}/api/race/profile/results`);
      url.searchParams.append('zwiftId', zwiftId);
      url.searchParams.append('page', page);
      url.searchParams.append('docsOnPage', docsOnPage);
      url.searchParams.append('columnName', columnName);
      url.searchParams.append('isRasing', isRasing);

      const response = await axios({
        url: url.toString(),
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

const userResultsSlice = createSlice({
  name: 'userResults',
  initialState: {
    results: [],
    quantityPages: null,

    status: null,
    error: null,
  },
  reducers: {
    resetUserResults: (state) => {
      state.results = [];
      state.quantityPages = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserResults.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUserResults.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.results = action.payload.userResults;
      state.quantityPages = action.payload.quantityPages;
    });
    builder.addCase(fetchUserResults.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetUserResults } = userResultsSlice.actions;

export default userResultsSlice.reducer;
