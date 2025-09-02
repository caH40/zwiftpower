import { createSlice } from '@reduxjs/toolkit';

import { fetchPaymentTransactions } from './fetchPaymentNotifications';

const initialState = {
  paymentTransactions: [],
  siteServices: [],
  status: null,
  error: null,
};

/**
 * Слайс для работы с сервисами сайта.
 */
const paymentNotificationsSlice = createSlice({
  name: 'paymentNotifications',
  initialState,
  reducers: {
    resetPaymentTransactions(state) {
      state.siteServices = [];
    },
  },

  extraReducers: (builder) => {
    // ==============  получение всех оповещения(транзакций) для пользователя =================
    builder.addCase(fetchPaymentTransactions.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPaymentTransactions.fulfilled, (state, action) => {
      state.paymentTransactions = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPaymentTransactions.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetPaymentTransactions } = paymentNotificationsSlice.actions;

export default paymentNotificationsSlice.reducer;
