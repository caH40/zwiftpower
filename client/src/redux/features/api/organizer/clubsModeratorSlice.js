import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteModeratorClubsZwiftModerator,
  fetchGetClubsForModeratorZwiftModerator,
  fetchGetClubsZwiftModerator,
  fetchGetClubZwiftModerator,
  fetchPostClubsZwiftModerator,
  fetchPutModeratorClubsZwiftModerator,
} from './fetchClubsModerator';

const initialState = {
  id: 0,
  clubs: [],
  clubForAdd: {},
  clubsForModerator: [],
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
    resetClubIdForAddModerator(state) {
      state.id = 0;
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

    // ============== получение данных о клубах =================
    // ==============  в которых пользователь является модератором =================
    builder.addCase(fetchGetClubsForModeratorZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetClubsForModeratorZwiftModerator.fulfilled, (state, action) => {
      state.clubsForModerator = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetClubsForModeratorZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ========== получение данных о клубе из ZwiftAPI для добавления Организатору ============
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

    // =========== добавление пользователя модератором в клуб ==============
    builder.addCase(fetchPutModeratorClubsZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutModeratorClubsZwiftModerator.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutModeratorClubsZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // =========== удаление пользователя из модераторов клуба ==============
    builder.addCase(fetchDeleteModeratorClubsZwiftModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDeleteModeratorClubsZwiftModerator.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDeleteModeratorClubsZwiftModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const {
  resetClubsModerator,
  setClubId,
  resetClubForAddModerator,
  resetClubIdForAddModerator,
} = clubsModeratorSlice.actions;

export default clubsModeratorSlice.reducer;
