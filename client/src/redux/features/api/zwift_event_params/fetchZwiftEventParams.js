import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

export const fetchZwiftEventParams = createAsyncThunk(
  'zwift/eventParams',
  async function ({ eventId, organizerId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/zwift/events/${eventId}/${organizerId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

export const fetchZwiftEventParamsForModerator = createAsyncThunk(
  'zwift/eventParamsForModerator',
  async function ({ eventId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/zwift/events/moderator/${eventId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
