import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение получение клубов из БД для Организатора.
 */
export const fetchGetClubsZwiftModerator = createAsyncThunk(
  'organizerClubsModerator/get',
  async ({ organizerId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs/${organizerId}`,
        method: 'get',
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
