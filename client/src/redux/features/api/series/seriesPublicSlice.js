import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetSeries,
  fetchGetSeriesOne,
  fetchGetStageResults,
  fetchGetStages,
  fetchPutStageResults,
} from './fetchSeries';

const initialState = {
  seriesPublic: null, // Серии для пользователей.
  seriesPublicOne: null,
  stageResults: null,
  stages: null,
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
      state.seriesPublic = null;
    },
    resetSeriesPublicOne: (state) => {
      state.seriesPublicOne = null;
    },
    resetStageResults: (state) => {
      state.stageResults = null;
    },
    resetStages: (state) => {
      state.stages = null;
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

    // ============== получение результатов этапа Серий заездов =================
    builder.addCase(fetchGetStageResults.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetStageResults.fulfilled, (state, action) => {
      state.stageResults = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetStageResults.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение результатов этапа Серий заездов =================
    builder.addCase(fetchPutStageResults.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutStageResults.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutStageResults.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение результатов этапа Серий заездов =================
    builder.addCase(fetchGetStages.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetStages.fulfilled, (state, action) => {
      state.stages = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetStages.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetSeriesPublicAll, resetSeriesPublicOne, resetStageResults, resetStages } =
  seriesPublicSlice.actions;

export default seriesPublicSlice.reducer;
