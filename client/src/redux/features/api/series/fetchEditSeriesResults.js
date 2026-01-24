import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Изменение категории райдера в результатах заезда этапа серии.
 */
export const fetchPatchCategoryInSeriesResult = createAsyncThunk(
  'categoryInSeriesResult/patch',
  async (newCategory, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/category`,
        method: 'patch',
        data: newCategory,
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Изменение штрафов райдера в результатах заезда этапа серии.
 */
export const fetchPatchTimePenaltyInSeriesResult = createAsyncThunk(
  'timePenaltyInSeriesResult/patch',
  async (data, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/time-penalty`,
        method: 'patch',
        data,
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Ручное добавление результата райдера на этапа серии, который из-за бага не сохранился в протоколе api zwift.
 */
export const fetchPostStageResultInSeries = createAsyncThunk(
  'stageResultInSeries/post',
  async (newResult, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/result`,
        method: 'post',
        data: newResult,
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Удаление результата этапа серии, добавленного модератором.
 */
export const fetchDeleteStageResultInSeries = createAsyncThunk(
  'stageResultInSeries/delete',
  async ({ resultId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/result`,
        method: 'delete',
        data: { resultId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Установка дисквалификации результата.
 */
export const fetchSetDisqualificationStageResult = createAsyncThunk(
  'setDisqualificationStageResult/patch',
  async ({ resultId, disqualification }, thunkAPI) => {
    console.log({ resultId, disqualification });

    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/result/disqualification/set`,
        method: 'patch',
        data: { resultId, disqualification },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Снятие дисквалификации результата.
 */
export const fetchRemoveDisqualificationStageResult = createAsyncThunk(
  'removeDisqualificationStageResult/patch',
  async ({ resultId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/result/disqualification/remove`,
        method: 'patch',
        data: { resultId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
