import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Получение данных для совершения платежа на сервисе YooKassa для сервиса Организатор.
 */
export const fetchOrganizerPaymentPayload = createAsyncThunk(
  'organizerPaymentPayload/get',
  async ({ returnUrl, planId }, thunkAPI) => {
    try {
      const url = new URL('/api/payments/payload/organizer', serverExpress);
      if (returnUrl) {
        url.searchParams.set('returnUrl', returnUrl);
        url.searchParams.set('planId', planId);
      }

      const response = await myAxios({
        url: url.toString(),
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
