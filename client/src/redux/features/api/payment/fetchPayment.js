import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Покупка сервиса сайта.
 */
export const fetchPurchaseSiteService = createAsyncThunk(
  'purchaseSiteService/post',
  async ({ createPayload }, thunkAPI) => {
    console.log(createPayload);

    try {
      const response = await myAxios({
        url: `${serverExpress}/api/payment`,
        method: 'post',
        data: createPayload,
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
