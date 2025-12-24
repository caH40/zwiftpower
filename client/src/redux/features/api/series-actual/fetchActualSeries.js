import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

export const fetchActualSeries = createAsyncThunk(
  'race/actualSeries',
  async function ({ organizerId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/actual/${organizerId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
