import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Обновление настроек трансляций пользователя.
 */
export const fetchPutUserStreams = createAsyncThunk(
  'user/putUserStreams',
  async function ({ zwiftId, streams }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/profile/streams`,
        method: 'put',
        data: { zwiftId, streams },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
