import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { getAuth } from '../../authSlice';
import { checkAuth } from '../../../../api/auth-check';
import { fetchZwiftProfiles } from '../zwiftProfiles/fetchZwiftProfile';
import { serverExpress } from '../../../../config/environment';
import { lsAccessToken } from '../../../../constants/localstorage';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Привязка основного или дополнительного ZwiftId к аккаунту на сайте.
 */
export const fetchUserPut = createAsyncThunk(
  'user/putSettingsAddZwiftId',
  async function ({ zwiftId, isAdditional }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/zwiftid`,
        method: 'put',
        data: { zwiftId, isAdditional },
      });

      // запрос обновленных данных аккаунта с БД
      const auth = await checkAuth();

      // Обновление данных авторизованного пользователя на сайте, обновление токена доступа в локальном хранилище.
      if (auth && auth.data.success === true) {
        thunkAPI.dispatch(getAuth({ status: true, user: auth.data.user }));
        localStorage.setItem(lsAccessToken, auth.data.accessToken);
      }

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );

      // Обновление блока привязанных аккаунтов из Zwift в настройках профиля.
      thunkAPI.dispatch(fetchZwiftProfiles(response.data.data.zwiftIdMain));

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

      // Обновление блока привязанных аккаунтов зи Zwift.
      thunkAPI.dispatch(fetchZwiftProfiles(response.data.zwiftIdMain));

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
