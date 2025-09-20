import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
