import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

/**
 * запрос данных райдера Звифта с сервера ZwiftAPI по zwiftId
 */
export const fetchZwiftProfile = createAsyncThunk(
  'zwift/profile',
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

/**
 * запрос данных райдеров Звифта с сервера ZwiftAPI по основному zwiftId
 */
export const fetchZwiftProfiles = createAsyncThunk(
  'zwift/profiles',
  async function (zwiftId, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/profile/${zwiftId}/zwift-profiles`,
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
