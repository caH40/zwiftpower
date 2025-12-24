import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Обновление настроек оповещения пользователя по почте.
 */
export const putUserNotifications = createAsyncThunk(
  'user/putNotifications',
  async function ({ zwiftId, notifications }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/notifications`,
        method: 'put',
        data: { zwiftId, notifications },
      });

      // thunkAPI.dispatch(fetchUserNotifications({ zwiftId }));

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
