import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получения настроек оповещения пользователя по почте.
 */
export const fetchUserNotifications = createAsyncThunk(
  'user/getNotifications',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/notifications/${zwiftId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Обновление настроек оповещения пользователя по почте.
 */
export const fetchPutUserNotifications = createAsyncThunk(
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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
