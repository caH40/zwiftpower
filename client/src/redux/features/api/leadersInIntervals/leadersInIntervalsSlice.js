import { createSlice } from '@reduxjs/toolkit';

import { fetchLeadersInIntervals } from './fetchLeadersInIntervals';

const initialState = {
  maxWatts: [],
  maxWattsPerKg: [],
  status: null,
  error: null,
};

const leadersInIntervalsSlice = createSlice({
  name: 'ridersInEvents',
  initialState,
  reducers: {
    resetLeadersInIntervals: (state) => {
      state.maxWatts = [];
      state.maxWattsPerKg = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLeadersInIntervals.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchLeadersInIntervals.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      state.maxWatts = action.payload.maxWattsWithProfile;
      state.maxWattsPerKg = action.payload.maxWattsPerKgWithProfile;
    });

    builder.addCase(fetchLeadersInIntervals.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetLeadersInIntervals } = leadersInIntervalsSlice.actions;
export default leadersInIntervalsSlice.reducer;
