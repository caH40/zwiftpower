import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Сохранение ID аккаунта райдера в стороннем сервисе (Strava, Garmin Connect).
 * Ссылка на профиль не передаётся: она собирается на клиенте по шаблону сервиса.
 *
 * @param {Object} payload - Данные для сохранения.
 * @param {string} payload.service - Идентификатор сервиса: `strava` или `garmin`.
 * @param {string} payload.accountId - ID аккаунта в сервисе.
 */
export const putExternalAccount = createAsyncThunk(
  'externalAccounts/put',
  async function ({ service, accountId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/external-accounts/${service}`,
        method: 'put',
        data: { accountId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
