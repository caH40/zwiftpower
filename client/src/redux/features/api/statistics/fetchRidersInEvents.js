import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../../alertMessageSlice';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

export const fetchRidersInEvents = createAsyncThunk(
  'ridersInEvents/fetchRidersInEvents',
  async function (period, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/statistics/riders-in-events/${period}`,
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
