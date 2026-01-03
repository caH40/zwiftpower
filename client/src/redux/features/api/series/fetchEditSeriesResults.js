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
  async (timePenalty, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/time-penalty`,
        method: 'patch',
        data: timePenalty,
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
