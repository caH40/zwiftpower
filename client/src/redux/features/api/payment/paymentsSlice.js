import { createSlice } from '@reduxjs/toolkit';

import { fetchPurchaseSiteService } from './fetchPayment';

const initialState = {
  status: null,
  error: null,
};

/**
 * Слайс для работы с сервисами сайта.
 */
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    // resetPaymentResponseSite(state) {
    //   state.paymentResponse = null;
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

export const { resetSiteServices } = paymentsSlice.actions;

export default paymentsSlice.reducer;
