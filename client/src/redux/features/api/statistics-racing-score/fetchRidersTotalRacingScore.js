import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

export const fetchRidersTotalRacingScore = createAsyncThunk(
  'ridersTotalRacingScore/fetchRidersTotalRacingScore',
  async function (_, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/statistics/riders-total-racing-score`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
