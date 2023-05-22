import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchUserResults = createAsyncThunk(
  'userResultsGet/profile',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/profile/${zwiftId}/results/`,
        method: 'get',
      });
      return response.data.userResults;
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
    user: {},
    results: [],

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserResults.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUserResults.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.results = action.payload;
    });
    builder.addCase(fetchUserResults.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default userResultsSlice.reducer;
