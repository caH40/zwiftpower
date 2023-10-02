import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

export const fetchActualSeries = createAsyncThunk(
  'race/actualSeries',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/actual`,
        method: 'get',
      });

      thunkAPI.dispatch(
        getAlert({ message: 'Данные получены', type: 'success', isOpened: true })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
