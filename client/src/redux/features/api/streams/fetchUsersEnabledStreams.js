import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение включенных трансляций пользователей.
 */
export const fetchUsersEnabledStreams = createAsyncThunk(
  'user/getUserEnabledStreams',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/streams`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
