import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Все Серии заездов Организатора.
 */
export const fetchGetSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
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
 * Создание Серии заездов Организатором.
 */
export const fetchPostSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/post',
  async (dataFromForm, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
        method: 'post',
        data: dataFromForm,
        headers: { 'Content-Type': 'multipart/form-data' },
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
 * Удаление Серии заездов Организатором.
 */
export const fetchDeleteSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/delete',
  async ({ seriesId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
        method: 'delete',
        data: { seriesId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
