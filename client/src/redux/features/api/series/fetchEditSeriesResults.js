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
  'categoryInSeriesResult/patch',
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
