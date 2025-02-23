import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteSeriesOrganizer,
  fetchGetSeriesOrganizer,
  fetchPostSeriesOrganizer,
} from './fetchSeries';

const initialState = {
  series: [],
  message: null,
  status: null,
  error: null,
};

/**
 * Слайс для работы Организатора с Сериями.
 */
const seriesOrganizerSlice = createSlice({
  name: 'seriesOrganizer',
  initialState,
  reducers: {
    resetSeriesOrganizer: (state) => {
      state.series = [];
    },
  },

  extraReducers: (builder) => {
    // ============== создание Серии заездов =================
    builder.addCase(fetchPostSeriesOrganizer.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPostSeriesOrganizer.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPostSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение всех Серий заездов организатора =================
    builder.addCase(fetchGetSeriesOrganizer.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetSeriesOrganizer.fulfilled, (state, action) => {
      state.series = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение всех Серий заездов организатора =================
    builder.addCase(fetchDeleteSeriesOrganizer.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDeleteSeriesOrganizer.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDeleteSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSeriesOrganizer } = seriesOrganizerSlice.actions;

export default seriesOrganizerSlice.reducer;
