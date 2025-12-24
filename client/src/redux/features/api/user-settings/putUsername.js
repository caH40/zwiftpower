import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Сохранение изменений username пользователя.
 */
export const putUsername = createAsyncThunk(
  'user/putUsername',
  async function ({ username }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/username`,
        method: 'put',
        data: { username },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
