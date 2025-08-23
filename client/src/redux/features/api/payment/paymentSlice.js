import { createSlice } from '@reduxjs/toolkit';

import { fetchPurchaseSiteService } from './fetchPayment';

const initialState = {
  status: null,
  error: null,
};

/**
 * Слайс для работы с сервисами сайта.
 */
const paymentSlice = createSlice({
  name: 'organizerClubsModerator',
  initialState,
  reducers: {
    // resetSiteServices(state) {
    //   state.siteServices = [];
    // },
  },

  extraReducers: (builder) => {
    // ============== покупка сервиса =================
    builder.addCase(fetchPurchaseSiteService.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPurchaseSiteService.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPurchaseSiteService.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSiteServices } = paymentSlice.actions;

export default paymentSlice.reducer;
