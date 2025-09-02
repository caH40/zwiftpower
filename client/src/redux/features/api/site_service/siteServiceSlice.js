import { createSlice } from '@reduxjs/toolkit';

import { fetchAllSiteServices, fetchPurchasableSiteServices } from './fetchSiteServices';

const initialState = {
  purchasableSiteServices: [],
  siteServices: {},
  status: null,
  error: null,
};

/**
 * Слайс для работы с сервисами сайта.
 */
const siteServiceSlice = createSlice({
  name: 'siteService',
  initialState,
  reducers: {
    resetSiteServices(state) {
      state.siteServices = {};
    },
    resetPurchasableSiteServices(state) {
      state.purchasableSiteServices = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение списка сервисов сайта для покупки =================
    builder.addCase(fetchPurchasableSiteServices.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPurchasableSiteServices.fulfilled, (state, action) => {
      state.purchasableSiteServices = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPurchasableSiteServices.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение всех активных и истекших слотов на сервисы сайта у пользователя =================
    builder.addCase(fetchAllSiteServices.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchAllSiteServices.fulfilled, (state, action) => {
      state.siteServices = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchAllSiteServices.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSiteServices, resetPurchasableSiteServices } = siteServiceSlice.actions;

export default siteServiceSlice.reducer;
