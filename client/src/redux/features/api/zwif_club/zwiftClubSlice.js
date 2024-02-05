import { createSlice } from '@reduxjs/toolkit';

import { fetchDeleteZwiftClub, fetchGetZwiftClub } from './fetchZwiftClub';

const initialState = {
  id: 0,
  club: {},
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
      state.id = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetZwiftClub.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // запрос на удаление Клуба из БД
    builder.addCase(fetchDeleteZwiftClub.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDeleteZwiftClub.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDeleteZwiftClub.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setClubId, resetClub } = zwiftClubSlice.actions;

export default zwiftClubSlice.reducer;
