import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Отправка оповещения пользователям на почту.
 */
export const sendNotification = createAsyncThunk(
  'users/sendNotification',
  async function ({ notificationsTypes, text }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/notification`,
        method: 'post',
        data: { notificationsTypes, text },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
