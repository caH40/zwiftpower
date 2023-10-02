import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

export const fetchZwiftEventParams = createAsyncThunk(
  'zwift/eventParams',
  async function (eventId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/zwift/events/${eventId}`,
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
