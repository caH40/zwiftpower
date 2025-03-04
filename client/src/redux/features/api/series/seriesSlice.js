import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteSeriesOrganizer,
  fetchGetOneSeriesOrganizer,
  fetchGetSeriesOrganizer,
  fetchPostSeriesOrganizer,
  fetchPutSeriesOrganizer,
  fetchUpdateSeriesStage,
  fetchUpdateSeriesStages,
} from './fetchSeries';

const initialState = {
  series: [], // Серии для Организаторов.
  seriesOne: null,
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
    resetSeriesOneOrganizer: (state) => {
      state.seriesOne = null;
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

    builder.addCase(fetchDeleteSeriesOrganizer.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDeleteSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== изменение данных Серии заездов =================
    builder.addCase(fetchPutSeriesOrganizer.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutSeriesOrganizer.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение Серии заездов организатора =================
    builder.addCase(fetchGetOneSeriesOrganizer.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOneSeriesOrganizer.fulfilled, (state, action) => {
      state.seriesOne = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOneSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== добавление/удаление Этапа в Серию заездов =================
    builder.addCase(fetchUpdateSeriesStages.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUpdateSeriesStages.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUpdateSeriesStages.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== изменение настроек этапа в Серии заездов =================
    builder.addCase(fetchUpdateSeriesStage.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUpdateSeriesStage.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUpdateSeriesStage.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSeriesOrganizer, resetSeriesOneOrganizer } = seriesOrganizerSlice.actions;

export default seriesOrganizerSlice.reducer;
