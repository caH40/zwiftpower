import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение фитфайла активностей.
 */
export const fetchGetFitfiles = createAsyncThunk(
  'fitfiles/get',
  async ({ zwiftId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/fitfile/${zwiftId}`,
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
 * Обновление параметра banned в фитфайле активности.
 */
export const fetchPutBannedFitfiles = createAsyncThunk(
  'fitfilesBanned/put',
  async ({ _idActivity, banned }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/fitfile`,
        method: 'put',
        data: { _idActivity, banned },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
