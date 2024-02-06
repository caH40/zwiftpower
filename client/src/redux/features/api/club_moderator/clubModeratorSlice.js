import { createSlice } from '@reduxjs/toolkit';

import { fetchPutClubModerator } from './fetchClubModerator';

const initialState = {
  status: null,
  error: null,
};

const clubModeratorSlice = createSlice({
  name: 'clubModerator',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPutClubModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchPutClubModerator.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });
    builder.addCase(fetchPutClubModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default clubModeratorSlice.reducer;
