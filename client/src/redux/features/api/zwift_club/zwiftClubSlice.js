import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteZwiftClub,
  fetchGetZwiftClub,
  fetchGetZwiftClubs,
  fetchUpdateZwiftClub,
} from './fetchZwiftClub';

const initialState = {
  id: 0,
  club: {},
  clubs: [],
  status: null,
  error: null,
};

const zwiftClubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    resetClub: (state) => {
      state.id = 0;
      state.club = {};
      state.clubs = [];
    },
    setClubId: (state, action) => {
      state.id = action.payload;
    },
  },

  extraReducers: (builder) => {
    // запрос на получение данных Клуба из ZwiftAPI
    builder.addCase(fetchGetZwiftClub.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetZwiftClub.fulfilled, (state, action) => {
      state.club = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetZwiftClub.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // получение всех Клубов из БД
    builder.addCase(fetchGetZwiftClubs.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetZwiftClubs.fulfilled, (state, action) => {
      state.clubs = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetZwiftClubs.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // удаление клуба из БД
    builder.addCase(fetchDeleteZwiftClub.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    // ========================== обновление данных Клуба из Zwift API в БД ==========================
    builder.addCase(fetchUpdateZwiftClub.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUpdateZwiftClub.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUpdateZwiftClub.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setClubId, resetClub } = zwiftClubSlice.actions;

export default zwiftClubSlice.reducer;
