import { createSlice } from '@reduxjs/toolkit';

import { fetchSiteServicePrice } from './fetchSiteServicePrice';

const initialState = {
  siteServicePrice: [],
  status: null,
  error: null,
};

/**
 * Слайс для работы с прайсом цен на сервисы сайта.
 */
const siteServicePriceSlice = createSlice({
  name: 'siteServicePrice',
  initialState,
  reducers: {
    resetSiteServicePrice(state) {
      state.siteServicePrice = [];
    },
  },

  extraReducers: (builder) => {
    // ==============  получение прайса цен на сервисы сайта =================
    builder.addCase(fetchSiteServicePrice.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchSiteServicePrice.fulfilled, (state, action) => {
      state.siteServicePrice = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchSiteServicePrice.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSiteServicePrice } = siteServicePriceSlice.actions;

export default siteServicePriceSlice.reducer;
