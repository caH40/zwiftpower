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
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/payments`,
        method: 'post',
        data: { createPayload },
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
 * Получение данных для совершения платежа на сервисе YooKassa для сервиса Организатор.
 */
export const fetchOrganizerPaymentPayload = createAsyncThunk(
  'organizerPaymentPayload/get',
  async ({ returnUrl }, thunkAPI) => {
    try {
      const url = new URL('/api/payments/payload/organizer', serverExpress);
      if (returnUrl) {
        url.searchParams.set('returnUrl', returnUrl);
      }

      const response = await myAxios({
        url: url.toString(),
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
