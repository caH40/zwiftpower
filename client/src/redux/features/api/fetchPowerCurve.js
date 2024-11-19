import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../alertMessageSlice';
import { myAxios } from '../../../api/axios';
import { serverExpress } from '../../../config/environment';

/**
 * Обновление Fitfile и PowerCurve райдера zwiftId.
 */
export const fetchPowerCurve = createAsyncThunk(
  'riderPowerCurve/put',
  async ({ zwiftId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/riders/power-curve`,
        method: 'put',
        data: { zwiftId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
