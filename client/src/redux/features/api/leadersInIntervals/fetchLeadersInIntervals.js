import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../../alertMessageSlice';
import { serverExpress } from '../../../../config/environment';

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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
