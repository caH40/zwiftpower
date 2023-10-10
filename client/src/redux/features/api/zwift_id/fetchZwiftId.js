import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

export const fetchZwiftId = createAsyncThunk(
  'zwift/zwiftId',
  async function (zwiftId, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/zwift/rider/${zwiftId}`,
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
