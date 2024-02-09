import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteOrganizerAdmin,
  fetchGetOrganizerAdmin,
  fetchPostOrganizerAdmin,
} from './fetchOrganizerAdmin';

const initialState = {
  organizers: [],
  status: null,
  error: null,
};

/**
 * Слайс добавления/удаления Организатора заездов в БД сайта
 */
const organizerAdminSlice = createSlice({
  name: 'organizerAdmin',
  initialState,
  reducers: {
    resetOrganizers(state) {
      state.organizers = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение списка организаторов=================
    builder.addCase(fetchGetOrganizerAdmin.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOrganizerAdmin.fulfilled, (state, action) => {
      state.organizers = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOrganizerAdmin.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== создание организатора=================
    builder.addCase(fetchPostOrganizerAdmin.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPostOrganizerAdmin.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPostOrganizerAdmin.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== удаление организатора=================
    builder.addCase(fetchDeleteOrganizerAdmin.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDeleteOrganizerAdmin.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDeleteOrganizerAdmin.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetOrganizers } = organizerAdminSlice.actions;

export default organizerAdminSlice.reducer;
