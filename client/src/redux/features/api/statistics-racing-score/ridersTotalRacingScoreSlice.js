import { createSlice } from '@reduxjs/toolkit';

import { fetchRidersTotalRacingScore } from './fetchRidersTotalRacingScore';

const initialState = {
  maleRacingScore: [],
  femaleRacingScore: [],
  status: null,
  error: null,
};

/**
 * Слайс обработки данных райдеров по Racing Score.
 */
const ridersTotalRacingScoreSlice = createSlice({
  name: 'ridersTotalRacingScore',
  initialState,
  reducers: {
    resetRidersTotalRacingScore(state) {
      state.maleRacingScore = [];
      state.femaleRacingScore = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRidersTotalRacingScore.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchRidersTotalRacingScore.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      state.maleRacingScore = action.payload.maleRacingScore;
      state.femaleRacingScore = action.payload.femaleRacingScore;
    });

    builder.addCase(fetchRidersTotalRacingScore.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetRidersTotalRacingScore } = ridersTotalRacingScoreSlice.actions;
export default ridersTotalRacingScoreSlice.reducer;
