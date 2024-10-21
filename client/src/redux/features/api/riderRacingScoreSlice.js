import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { serverExpress } from '../../../config/environment';

export const fetchRiderRacingScore = createAsyncThunk(
  'riderRacingScoreGet/profile',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/profile/${zwiftId}/metric/racing-score/`,
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

const riderRacingScoreSlice = createSlice({
  name: 'powerCurve',
  initialState: {
    racingScores: [],

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRiderRacingScore.pending, (state) => {
      state.racingScores = [];
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRiderRacingScore.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      state.racingScores = action.payload.racingScores;
    });
    builder.addCase(fetchRiderRacingScore.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default riderRacingScoreSlice.reducer;
