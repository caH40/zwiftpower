import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Создание названия конфигурации финишного протокола.
 */
export const fetchPostFinishProtocol = createAsyncThunk(
  'configFinishProtocol/post',
  async (configFP, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/finish-protocols`,
        method: 'post',
        data: configFP,
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
 * Обновление данных конфигурации финишного протокола.
 */
export const fetchPutFinishProtocol = createAsyncThunk(
  'configFinishProtocol/put',
  async (configFP, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/finish-protocols`,
        method: 'put',
        data: configFP,
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
 * Получение данных всех конфигураций финишных протоколов.
 */
export const fetchGetAllFinishProtocol = createAsyncThunk(
  'configFinishProtocols/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/finish-protocols`,
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
 * Удаление конфигурации финишного протокола.
 */
export const fetchDeleteFinishProtocol = createAsyncThunk(
  'configFinishProtocols/delete',
  async ({ configFPId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin//finish-protocols/${configFPId}`,
        method: 'delete',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
