import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

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
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
