import { createSlice } from '@reduxjs/toolkit';

import { fetchZwiftProfiles } from './fetchZwiftProfile';

const initialState = {
  zwiftProfiles: {},
  status: null,
  error: null,
};

const zwiftProfilesSlice = createSlice({
  name: 'zwiftRiders',
  initialState,
  reducers: {
    resetZwiftProfiles: (state) => {
      state.zwiftProfiles = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchZwiftProfiles.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchZwiftProfiles.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.zwiftProfiles = action.payload;
    });

    builder.addCase(fetchZwiftProfiles.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetZwiftProfiles } = zwiftProfilesSlice.actions;

export default zwiftProfilesSlice.reducer;
