import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Отправка оповещения пользователям на почту.
 */
export const sendNotification = createAsyncThunk(
  'users/sendNotification',
  async function ({ text, notificationsTypes, subject, title }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/notification`,
        method: 'post',
        data: { text, notificationsTypes, subject, title },
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
 * Запрос на письма-оповещения для предварительного просмотра и контроля содержимого.
 */
export const getNotificationLetterPreview = createAsyncThunk(
  'users/getNotificationLetterPreview',
  async function ({ text, notificationsTypes, subject, title }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/notification/letter-preview`,
        method: 'post',
        data: {
          text,
          notificationsTypes: JSON.stringify(notificationsTypes),
          subject,
          title,
        },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
