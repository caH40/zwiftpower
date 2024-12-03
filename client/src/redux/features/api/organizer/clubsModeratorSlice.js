import { createSlice } from '@reduxjs/toolkit';

import { fetchGetClubsZwiftModerator } from './fetchClubsModerator';

const initialState = {
  clubs: [],
  status: null,
  error: null,
};

/**
 * Слайс для работы с клубами с Звифта у Организатора.
 */
const clubsModeratorSlice = createSlice({
  name: 'organizerClubsModerator',
  initialState,
  reducers: {
    resetClubsModerator(state) {
      state.clubs = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение данных о боте zwift=================
    builder.addCase(fetchGetClubsZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetClubsZwiftModerator.fulfilled, (state, action) => {
      state.clubs = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetClubsZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetClubsModerator } = clubsModeratorSlice.actions;

export default clubsModeratorSlice.reducer;
