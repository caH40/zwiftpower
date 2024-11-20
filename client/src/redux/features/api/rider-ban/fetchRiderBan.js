import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение списка баннов для райдера.
 */
export const fetchGetRiderBan = createAsyncThunk(
  'riderBan/get',
  async ({ zwiftId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/riders/ban/${zwiftId}`,
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
 * Обновление баннов для райдера.
 */
export const fetchPutRiderBan = createAsyncThunk(
  'riderBan/put',
  async ({ zwiftId, banned, code, description }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/riders/ban`,
        method: 'put',
        data: { zwiftId, banned, code, description },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
