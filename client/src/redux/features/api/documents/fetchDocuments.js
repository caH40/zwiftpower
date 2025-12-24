import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение списка документов типа type.
 */
export const fetchDocuments = createAsyncThunk(
  'fetchDocuments/getList',
  async ({ type }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/md-documents/list/${type}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Получение списка документа.
 */
export const fetchDocument = createAsyncThunk(
  'fetchDocuments/get',
  async ({ fileName, type }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/md-documents/${type}/${fileName}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
