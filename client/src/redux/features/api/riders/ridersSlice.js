import { createSlice } from '@reduxjs/toolkit';

import { fetchRiders } from './fetchRiders';

export const ridersSlice = createSlice({
  name: 'riders',
  initialState: {
    error: null,
    status: null,
    riders: [],
    quantityPages: 0,
  },
  reducers: {
    resetRiders(state) {
      state.riders = [];
      state.quantityPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRiders.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRiders.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.riders = action.payload.riders;
      state.quantityPages = action.payload.quantityPages;
    });
    builder.addCase(fetchRiders.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    });
  },
});

export const { resetRiders } = ridersSlice.actions;

export default ridersSlice.reducer;
