import { createSlice } from '@reduxjs/toolkit';

import { fetchGetRiderBan } from './fetchRiderBan';

const initialState = {
  bans: [],
  status: null,
  error: null,
};

const riderBanSlice = createSlice({
  name: 'riderBan',
  initialState,
  reducers: {
    resetRiderBan(state) {
      state.bans = null;
    },
  },

  extraReducers: (builder) => {
    // ============== получение=================
    builder.addCase(fetchGetRiderBan.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetRiderBan.fulfilled, (state, action) => {
      state.bans = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetRiderBan.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetRiderBan } = riderBanSlice.actions;

export default riderBanSlice.reducer;
