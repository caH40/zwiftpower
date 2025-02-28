import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Создание названия конфигурации финишного протокола.
 */
export const fetchFinishProtocol = createAsyncThunk(
  'finishProtocol/post',
  async ({ protocol, isCreating }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/finish-protocols`,
        method: 'post',
        data: { protocol, isCreating },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
