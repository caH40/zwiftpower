import { createSlice } from '@reduxjs/toolkit';

import { fetchOrganizerPaymentPayload, fetchPurchaseSiteService } from './fetchPayment';

const initialState = {
  organizerPaymentPayload: null,
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
    resetOrganizerPaymentPayload(state) {
      state.organizerPaymentPayload = null;
    },
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

    // ============== данные для совершения платежа на сервисе YooKassa для сервиса Организатор =================
    builder.addCase(fetchOrganizerPaymentPayload.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchOrganizerPaymentPayload.fulfilled, (state, action) => {
      state.organizerPaymentPayload = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchOrganizerPaymentPayload.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetOrganizerPaymentPayload } = paymentsSlice.actions;

export default paymentsSlice.reducer;
