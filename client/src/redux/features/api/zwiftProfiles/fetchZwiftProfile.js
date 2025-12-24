import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
