import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

export const fetchEventPost = createAsyncThunk(
  'race/eventPost',
  async function (event, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/race/events`,
        method: 'post',
        data: { event },
      });

      thunkAPI.dispatch(
        getAlert({
          message: response.data.message,
          type: 'success',
          isOpened: true,
        })
      );

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
