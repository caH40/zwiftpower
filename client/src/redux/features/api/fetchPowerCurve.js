import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { serverExpress } from '../../../config/environment';

import { handlerErrorAsyncThunk } from './utils/handler-error';

/**
 * Обновление Fitfile и PowerCurve райдера zwiftId.
 */
export const fetchPowerCurve = createAsyncThunk(
  'riderPowerCurve/put',
  async ({ zwiftId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/riders/power-curve`,
        method: 'put',
        data: { zwiftId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
