import { createSlice } from '@reduxjs/toolkit';

import { fetchZwiftProfile } from './fetchZwiftProfile';

const initialState = {
  zwiftId: 0,
  profile: {},
  status: null,
  error: null,
};

const zwiftIdSlice = createSlice({
  name: 'zwiftRider',
  initialState,
  reducers: {
    setZwiftId: (state, action) => {
      state.zwiftId = action.payload;
    },
    resetZwiftId: (state) => {
      state.zwiftId = 0;
    },
    resetZwiftProfile: (state) => {
      state.profile = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchZwiftProfile.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchZwiftProfile.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.profile = action.payload;
    });

    builder.addCase(fetchZwiftProfile.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setZwiftId, resetZwiftId, resetZwiftProfile } = zwiftIdSlice.actions;

export default zwiftIdSlice.reducer;
