import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение фитфайла активностей.
 */
export const fetchGetFitfiles = createAsyncThunk(
  'fitfiles/get',
  async ({ zwiftId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/fitfile/${zwiftId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Обновление параметра banned в фитфайле активности.
 */
export const fetchPutBannedFitfiles = createAsyncThunk(
  'fitfilesBanned/put',
  async ({ _idActivity, banned }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/fitfile`,
        method: 'put',
        data: { _idActivity, banned },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
