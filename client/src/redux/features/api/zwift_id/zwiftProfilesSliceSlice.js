import { createSlice } from '@reduxjs/toolkit';

import { fetchZwiftRiders } from './fetchZwiftId';

const initialState = {
  zwiftProfiles: {},
  status: null,
  error: null,
};

const zwiftProfilesSlice = createSlice({
  name: 'zwiftRiders',
  initialState,
  reducers: {
    resetZwiftRiders: (state) => {
      state.zwiftProfiles = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchZwiftRiders.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchZwiftRiders.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.zwiftProfiles = action.payload;
    });

    builder.addCase(fetchZwiftRiders.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetZwiftProfiles } = zwiftProfilesSlice.actions;

export default zwiftProfilesSlice.reducer;
