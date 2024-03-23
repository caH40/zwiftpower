import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { setValueMax } from '../../../utils/value-max';
import { serverExpress } from '../../../config/environment';

/**
 * Запрос на получение профиля райдера и его результатов
 */
export const fetchUserResults = createAsyncThunk(
  'userResultsGet/profile',
  async function ({ zwiftId, page, docsOnPage }, thunkAPI) {
    try {
      const search = `zwiftId=${zwiftId}&page=${page}&docsOnPage=${docsOnPage}`;
      const response = await axios({
        url: `${serverExpress}/api/race/profile/results?${search}`,
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
  name: 'logsAdmins',
  initialState: {
    profile: {},
    results: [],
    powerCurve: {},
    quantityPages: null,

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserResults.pending, (state) => {
      state.profile = {};
      state.results = [];
      state.powerCurve = {};
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUserResults.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.profile = action.payload.profile;
      state.powerCurve = action.payload.powerCurve;
      state.results = setValueMax(action.payload.userResults);
      state.quantityPages = action.payload.quantityPages;
    });
    builder.addCase(fetchUserResults.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default userResultsSlice.reducer;
