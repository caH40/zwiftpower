import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

export const fetchRidersInEvents = createAsyncThunk(
  'ridersInEvents/fetchRidersInEvents',
  async function (period, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/statistics/riders-in-events/${period}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
