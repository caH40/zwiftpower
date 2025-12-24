import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Обновление сообщения как прочитанного.
 */
export const fetchPutServiceMessages = createAsyncThunk(
  'serviceMessages/put',
  async ({ messageId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/service-messages/read`,
        method: 'put',
        data: { messageId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
