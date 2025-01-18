import { createSlice } from '@reduxjs/toolkit';

import { fetchOrganizerPublic, fetchOrganizersPublic } from './fetchOrganizersPublic';

const initialState = {
  organizers: [],
  organizer: {},
  status: null,
  error: null,
};

/**
 * Слайс для работы со списком организаторов заездов для публичной страницы.
 */
const organizersPublicSlice = createSlice({
  name: 'organizersPublic',
  initialState,
  reducers: {
    resetOrganizersPublic(state) {
      state.organizers = [];
    },
    resetOrganizerPublic(state) {
      state.organizer = {};
    },
  },

  extraReducers: (builder) => {
    // ============== получение списка Организаторов =================
    builder.addCase(fetchOrganizersPublic.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchOrganizersPublic.fulfilled, (state, action) => {
      state.organizers = action.payload.data || [];
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchOrganizersPublic.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    // ============== получение данных Организатора =================
    builder.addCase(fetchOrganizerPublic.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchOrganizerPublic.fulfilled, (state, action) => {
      state.organizer = action.payload.data || {};
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchOrganizerPublic.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetOrganizersPublic, resetOrganizerPublic } = organizersPublicSlice.actions;

export default organizersPublicSlice.reducer;
