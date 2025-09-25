import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение сервисных сообщений для пользователя всех команд.
 */
export const fetchServiceMessages = createAsyncThunk(
  'serviceMessages/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/service-messages`,
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
 * Обновление сообщения как прочитанного.
 */
export const fetchPutServiceMessages = createAsyncThunk(
  'serviceMessages/put',
  async ({ messageIds }, thunkAPI) => {
    try {
      console.log('fetchPutServiceMessages', { messageIds });

      const response = await myAxios({
        url: `${serverExpress}/api/service-messages/read`,
        method: 'put',
        data: { messageIds },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
