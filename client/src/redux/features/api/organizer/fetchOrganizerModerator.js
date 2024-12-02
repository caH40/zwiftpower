import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение данных о Zwift бота-модератора для клубов в Звифте у Организатора.
 */
export const fetchGetOrganizerBotsModerator = createAsyncThunk(
  'organizerBotsModerator/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/bots`,
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
 * Обновление данных (генерация нового token) Zwift бота-модератора для клубов в Звифте у Организатора.
 */
export const fetchPutOrganizerBotsModerator = createAsyncThunk(
  'organizerBotsModerator/put',
  async ({ organizerId, email, password }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/bots`,
        method: 'put',
        data: { organizerId, email, password },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
