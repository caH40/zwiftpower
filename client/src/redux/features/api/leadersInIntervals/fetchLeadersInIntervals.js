import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение лучших результатов райдеров на интервалах в Эвентах за 90 дней
 */
export const fetchLeadersInIntervals = createAsyncThunk(
  'statistics/leadersInIntervals',
  async function (gender, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/statistics/leaders-intervals/${gender}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
