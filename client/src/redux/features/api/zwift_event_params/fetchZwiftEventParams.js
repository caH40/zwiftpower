import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

export const fetchZwiftEventParams = createAsyncThunk(
  'zwift/eventParams',
  async function ({ eventId, forView }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/zwift/events/${eventId}/${forView || 'false'}`,
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
