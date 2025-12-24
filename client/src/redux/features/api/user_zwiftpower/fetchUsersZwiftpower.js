import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { fetchZwiftProfiles } from '../zwiftProfiles/fetchZwiftProfile';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение зарегистрированных Users на сайте zwiftpower.ru
 */
export const fetchUsersZwiftpower = createAsyncThunk(
  'user/getUsersZwiftpower',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/users`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Получение зарегистрированных Users на сайте zwiftpower.ru для запросов модераторов.
 * Данные только username, zwiftId
 */
export const fetchUsersZwiftpowerForModerator = createAsyncThunk(
  'user/getUsersZwiftpowerForModerator',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/moderator/users`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Удаление дополнительного ZwiftId профиля из профиля пользователя
 */
export const fetchUserDeleteZwiftId = createAsyncThunk(
  'user/putSettingsRemoveZwiftId',
  async function (zwiftIdForDelete, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/zwiftid`,
        method: 'delete',
        data: { zwiftId: zwiftIdForDelete },
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );

      // обновление блока профайлов ZwiftId
      thunkAPI.dispatch(fetchZwiftProfiles(response.data.zwiftIdMain));

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
