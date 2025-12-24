import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Запрос на письма-оповещения для предварительного просмотра и контроля содержимого.
 */
export const postEventsEmailPreview = createAsyncThunk(
  'users/postEventsEmailPreview',
  async function ({ eventsEmailPreview }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/notification/events-preview`,
        method: 'post',
        data: {
          eventsEmailPreview,
        },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
