import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение данных клуба из ZwiftAPI
 */
export const fetchGetZwiftClub = createAsyncThunk(
  'club/getZwiftClub',
  async function (clubId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/club/${clubId}`,
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
 * Удаление клуба из БД
 */
export const fetchDeleteZwiftClub = createAsyncThunk(
  'club/deleteZwiftClub',
  async function (clubId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/club`,
        method: 'delete',
        data: { clubId },
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
