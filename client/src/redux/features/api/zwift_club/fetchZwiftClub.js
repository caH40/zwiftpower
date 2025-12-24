import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
