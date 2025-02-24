import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteSeriesOrganizer,
  fetchGetOneSeriesOrganizer,
  fetchGetSeries,
  fetchGetSeriesOrganizer,
  fetchPostSeriesOrganizer,
  fetchPutSeriesOrganizer,
} from './fetchSeries';

const initialState = {
  seriesPublic: [], // Серии для пользователей.
  seriesPublicOne: null,
  message: null,
  status: null,
  error: null,
};

/**
 * Слайс для с Сериями для публичных запросов.
 */
const seriesPublicSlice = createSlice({
  name: 'seriesPublic',
  initialState,
  reducers: {
    resetSeriesPublicAll: (state) => {
      state.seriesPublic = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение всех Серий заездов =================
    builder.addCase(fetchGetSeries.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetSeries.fulfilled, (state, action) => {
      state.seriesPublic = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetSeries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSeriesPublicAll } = seriesPublicSlice.actions;

export default seriesPublicSlice.reducer;
