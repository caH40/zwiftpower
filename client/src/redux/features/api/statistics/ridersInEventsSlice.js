import { createSlice } from '@reduxjs/toolkit';

import { fetchRidersInEvents } from './fetchRidersInEvents';

const initialState = {
  ridersInEvents: [],
  status: null,
  error: null,
};

const ridersInEventsSlice = createSlice({
  name: 'ridersInEvents',
  initialState,
  reducers: {
    resetRidersInEvents(state) {
      state.ridersInEvents = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRidersInEvents.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRidersInEvents.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.ridersInEvents = action.payload.ridersInEvents;
    });
    builder.addCase(fetchRidersInEvents.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetRidersInEvents } = ridersInEventsSlice.actions;
export default ridersInEventsSlice.reducer;
