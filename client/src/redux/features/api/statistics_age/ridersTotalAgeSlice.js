import { createSlice } from '@reduxjs/toolkit';

import { fetchRidersTotalAge } from './fetchRidersTotalAge';

const initialState = {
  ridersTotalAge: [],
  status: null,
  error: null,
};

const ridersTotalAgeSlice = createSlice({
  name: 'ridersTotalAge',
  initialState,
  reducers: {
    resetRidersTotalAge(state) {
      state.ridersInEvents = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRidersTotalAge.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchRidersTotalAge.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.ridersTotalAge = action.payload;
    });

    builder.addCase(fetchRidersTotalAge.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetRidersTotalAge } = ridersTotalAgeSlice.actions;
export default ridersTotalAgeSlice.reducer;
