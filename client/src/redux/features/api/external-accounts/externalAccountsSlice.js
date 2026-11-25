import { createSlice } from '@reduxjs/toolkit';

import { putExternalAccount } from './putExternalAccount';

const initialState = {
  // ID аккаунтов в сторонних сервисах: { strava: '12345678', garmin: '1234567' }.
  externalAccounts: {},
  // Сервис, по которому сейчас идёт сохранение: 'strava' | 'garmin' | null.
  serviceInProgress: null,
  status: null,
  error: null,
};

const externalAccountsSlice = createSlice({
  name: 'externalAccounts',
  initialState,
  reducers: {
    resetExternalAccounts: (state) => {
      state.externalAccounts = {};
      state.serviceInProgress = null;
      state.status = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(putExternalAccount.pending, (state, action) => {
      state.error = null;
      state.status = 'loading';
      state.serviceInProgress = action.meta.arg.service;
    });

    builder.addCase(putExternalAccount.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.serviceInProgress = null;
      state.externalAccounts = {
        ...state.externalAccounts,
        [action.meta.arg.service]: action.meta.arg.accountId,
      };
    });

    builder.addCase(putExternalAccount.rejected, (state, action) => {
      state.status = 'rejected';
      state.serviceInProgress = null;
      state.error = action.payload;
    });
  },
});

export const { resetExternalAccounts } = externalAccountsSlice.actions;

export default externalAccountsSlice.reducer;
