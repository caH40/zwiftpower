import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение списка баннов для райдера.
 */
export const fetchGetRiderBan = createAsyncThunk(
  'riderBan/get',
  async ({ zwiftId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/riders/ban/${zwiftId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Обновление баннов для райдера.
 */
export const fetchPutRiderBan = createAsyncThunk(
  'riderBan/put',
  async ({ zwiftId, banned, code, description }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/riders/ban`,
        method: 'put',
        data: { zwiftId, banned, code, description },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
