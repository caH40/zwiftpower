import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { fetchGetZwiftClubs } from '../zwift_club/fetchZwiftClub';

/**
 * Добавление модератора для клуба
 */
export const fetchPutClubModerator = createAsyncThunk(
  'clubModerator/put',
  async function ({ clubId, userId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs/moderators`,
        method: 'put',
        data: { clubId, userId },
      });

      // обновление данных клубов
      thunkAPI.dispatch(fetchGetZwiftClubs());
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

/**
 * Удаления модератора для клуба
 */
export const fetchDeleteClubModerator = createAsyncThunk(
  'clubModerator/put',
  async function ({ clubId, userId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs/moderators`,
        method: 'delete',
        data: { clubId, userId },
      });

      // обновление данных клубов
      thunkAPI.dispatch(fetchGetZwiftClubs());
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
