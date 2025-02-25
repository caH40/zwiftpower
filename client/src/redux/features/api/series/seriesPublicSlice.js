import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteSeriesOrganizer,
  fetchGetOneSeriesOrganizer,
  fetchGetSeries,
  fetchGetSeriesOne,
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
    resetSeriesPublicOne: (state) => {
      state.seriesPublicOne = null;
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

    // ============== получение всех Серий заездов =================
    builder.addCase(fetchGetSeriesOne.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetSeriesOne.fulfilled, (state, action) => {
      state.seriesPublicOne = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetSeriesOne.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSeriesPublicAll, resetSeriesPublicOne } = seriesPublicSlice.actions;

export default seriesPublicSlice.reducer;
