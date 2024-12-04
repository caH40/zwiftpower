import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetOrganizerBotsModerator,
  fetchGetOrganizerModerator,
  fetchPutOrganizerBotsModerator,
} from './fetchOrganizerModerator';

const initialState = {
  tokens: [],
  organizer: {},
  status: null,
  error: null,
};

/**
 * Слайс Обновление token Zwift бота-модератора для клубов в Звифте у Организатора.
 */
const organizerModeratorSlice = createSlice({
  name: 'organizerBotsModerator',
  initialState,
  reducers: {
    resetOrganizerModerator(state) {
      state.tokens = [];
    },
    resetOrganizerDataModerator(state) {
      state.organizer = {};
    },
  },

  extraReducers: (builder) => {
    // ============== получение данных об Организаторе =================
    builder.addCase(fetchGetOrganizerModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOrganizerModerator.fulfilled, (state, action) => {
      state.organizer = action.payload.data || {};
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOrganizerModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    // ============== получение данных о боте zwift=================
    builder.addCase(fetchGetOrganizerBotsModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOrganizerBotsModerator.fulfilled, (state, action) => {
      state.tokens = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOrganizerBotsModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== обновление token zwift=================
    builder.addCase(fetchPutOrganizerBotsModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutOrganizerBotsModerator.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutOrganizerBotsModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetOrganizerModerator, resetOrganizerDataModerator } =
  organizerModeratorSlice.actions;

export default organizerModeratorSlice.reducer;
