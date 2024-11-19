import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../alertMessageSlice';
import { myAxios } from '../../../api/axios';
import { serverExpress } from '../../../config/environment';

/**
 * Обновление Fitfile и PowerCurve пользователя zwiftId.
 */
export const fetchPowerCurve = createAsyncThunk(
  'userPowerCurve/put',
  async ({ _idUser }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/user/power-curve`,
        method: 'put',
        data: { _idUser },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
