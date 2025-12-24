import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

export const fetchRidersTotalAge = createAsyncThunk(
  'ridersTotalAge/fetchRidersTotalAge',
  async function (_, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/statistics/riders-total-age`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
