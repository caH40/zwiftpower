import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../../alertMessageSlice';
import { serverExpress } from '../../../../config/environment';

export const fetchRidersTotalAge = createAsyncThunk(
  'ridersTotalAge/fetchRidersTotalAge',
  async function (_, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/statistics/riders-total-age`,
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
