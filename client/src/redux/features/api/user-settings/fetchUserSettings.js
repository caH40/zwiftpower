import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получения настроек профиля пользователя.
 */
export const fetchUserSettings = createAsyncThunk(
  'user/getUserSettings',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/settings/${zwiftId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
