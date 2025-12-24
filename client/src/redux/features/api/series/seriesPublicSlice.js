import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGeneralClassification,
  fetchGetSeries,
  fetchGetSeriesOne,
  fetchGetStageResults,
  fetchGetStages,
  fetchPutStageResults,
  fetchUpdateGeneralClassification,
} from './fetchSeries';

const initialState = {
  seriesPublic: null, // Серии для пользователей.
  seriesPublicOne: null,
  stageResults: null,
  generalClassification: null,
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
    resetSeriesPublicOne: (state) => {
      state.seriesPublicOne = null;
    },
    resetStageResults: (state) => {
      state.stageResults = null;
    },
    resetStages: (state) => {
      state.stages = null;
    },
    resetGeneralClassificationStages: (state) => {
      state.generalClassification = null;
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

    // ============== получение генеральной классификации Серий заездов =================
    builder.addCase(fetchGeneralClassification.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGeneralClassification.fulfilled, (state, action) => {
      state.generalClassification = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGeneralClassification.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== обновление генеральной классификации Серий заездов =================
    builder.addCase(fetchUpdateGeneralClassification.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUpdateGeneralClassification.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUpdateGeneralClassification.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const {
  resetSeriesPublicOne,
  resetStageResults,
  resetStages,
  resetGeneralClassificationStages,
} = seriesPublicSlice.actions;

export default seriesPublicSlice.reducer;
