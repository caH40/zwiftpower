import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Данные маршрута.
 */
export const fetchAssetsRoute = createAsyncThunk(
  'assets/getRoute',
  async (routeId, thunkAPI) => {
    try {
      // Если есть в кэше, то берем из него.
      const state = thunkAPI.getState();
      if (state.assets.routes.has(routeId)) {
        return state.assets.routes.get(routeId);
      }

      const response = await myAxios({
        url: `${serverExpress}/api/assets/routes/${routeId}`,
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
