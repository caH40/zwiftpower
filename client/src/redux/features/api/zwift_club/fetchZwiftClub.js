import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

import { resetClub } from './zwiftClubSlice';

/**
 * Получение списка клубов из БД
 */
export const fetchGetZwiftClubs = createAsyncThunk(
  'clubs/getZwiftClubs',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs`,
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
 * Получение данных клуба из ZwiftAPI
 */
export const fetchGetZwiftClub = createAsyncThunk(
  'clubs/getZwiftClub',
  async function (clubId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs/${clubId}`,
        method: 'get',
      });

      thunkAPI.dispatch(
        getAlert({ message: 'Данные получены!', type: 'success', isOpened: true })
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
 * Добавление клуба в БД
 */
export const fetchPostZwiftClub = createAsyncThunk(
  'clubs/deleteZwiftClub',
  async function ({ club, organizerId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs`,
        method: 'post',
        data: { club, organizerId },
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );
      thunkAPI.dispatch(fetchGetZwiftClubs());
      thunkAPI.dispatch(resetClub());

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
  'clubs/deleteZwiftClub',
  async function (clubId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs`,
        method: 'delete',
        data: { clubId },
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );
      thunkAPI.dispatch(fetchGetZwiftClubs());

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Запрос на обновление данных клуба из Zwift API и сохранение обновленных данных в БД.
 */
export const fetchUpdateZwiftClub = createAsyncThunk(
  'clubs/putZwiftClub',
  async function (clubId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/clubs`,
        method: 'put',
        data: { clubId },
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );
      thunkAPI.dispatch(fetchGetZwiftClubs());

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
