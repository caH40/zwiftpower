import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Данные маршрута.
 */
export const fetchAssetsRoutes = createAsyncThunk(
  'assets/getRoute',
  async ({ routeIds }, thunkAPI) => {
    try {
      if (!Array.isArray(routeIds) || typeof routeIds[0] !== 'number') {
        return thunkAPI.rejectWithValue('Получен не массив чисел');
      }

      // Если есть в кэше, то берем из него.
      const state = thunkAPI.getState();

      const filteredRouteIds = routeIds.filter((r) => {
        return !state.assets.routes[r];
      });

      if (filteredRouteIds.length === 0) {
        return { data: null, message: 'Данные запрашиваемых маршрутов есть в кэше.' };
      }

      const response = await myAxios({
        url: `${serverExpress}/api/assets/routes?ids=${JSON.stringify(filteredRouteIds)}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

export const fetchAssetsAllRoutes = createAsyncThunk(
  'assets/getAllRoutes',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/assets/routes/all`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
