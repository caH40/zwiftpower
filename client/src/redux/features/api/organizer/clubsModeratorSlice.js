import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetClubsZwiftModerator,
  fetchGetClubZwiftModerator,
  fetchPostClubsZwiftModerator,
  fetchPutClubsZwiftModerator,
} from './fetchClubsModerator';

const initialState = {
  id: 0,
  clubs: [],
  clubForAdd: {},
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
    resetClubForAddModerator(state) {
      state.id = 0;
      state.clubForAdd = {};
    },
    setClubId: (state, action) => {
      state.id = action.payload;
    },
  },

  extraReducers: (builder) => {
    // ============== получение данных о добавленных клубах у Организатора =================
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

    // =========== получение данных о клубе из ZwiftAPI для добавления Организатору ==============
    builder.addCase(fetchGetClubZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetClubZwiftModerator.fulfilled, (state, action) => {
      state.clubForAdd = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetClubZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // =========== добавление клуба в БД для Организатора ==============
    builder.addCase(fetchPostClubsZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPostClubsZwiftModerator.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPostClubsZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // =========== добавление модератора в клуб ==============
    builder.addCase(fetchPutClubsZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutClubsZwiftModerator.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutClubsZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetClubsModerator, setClubId, resetClubForAddModerator } =
  clubsModeratorSlice.actions;

export default clubsModeratorSlice.reducer;
