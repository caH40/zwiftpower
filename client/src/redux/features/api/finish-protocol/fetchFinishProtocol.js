import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Получение данных всех конфигураций финишных протоколов.
 */
export const fetchGetAllFinishProtocol = createAsyncThunk(
  'configFinishProtocols/get',
  async (organizerId, thunkAPI) => {
    try {
      const url = new URL('/api/admin/finish-protocols', serverExpress);
      if (organizerId) {
        url.pathname += `/${organizerId}`;
      }

      const response = await myAxios({
        url: url.toString(),
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
