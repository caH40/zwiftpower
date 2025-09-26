import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
