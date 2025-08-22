import { createSlice } from '@reduxjs/toolkit';

import { fetchSiteServices } from './fetchSiteServices';

const initialState = {
  siteServices: [],
  status: null,
  error: null,
};

/**
 * Слайс для работы с сервисами сайта.
 */
const siteServiceSlice = createSlice({
  name: 'organizerClubsModerator',
  initialState,
  reducers: {
    resetSiteServices(state) {
      state.siteServices = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение всех сервисов сайта =================
    builder.addCase(fetchSiteServices.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchSiteServices.fulfilled, (state, action) => {
      state.siteServices = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchSiteServices.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSiteServices } = siteServiceSlice.actions;

export default siteServiceSlice.reducer;
