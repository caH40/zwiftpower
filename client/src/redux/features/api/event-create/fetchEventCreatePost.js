import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Создание нового Эвента в Zwift и добавление его в БД при удачном создании
 */
export const fetchEventCreatePost = createAsyncThunk(
  'zwift/eventPostCreate',
  async function (event, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/zwift/events`,
        method: 'post',
        data: { event },
      });

      thunkAPI.dispatch(
        getAlert({
          message: response.data.message,
          type: 'success',
          isOpened: true,
        })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      console.log(message); // eslint-disable-line
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
