import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение всех оповещения(транзакций) для пользователя.
 */
export const fetchPaymentTransactions = createAsyncThunk(
  'paymentTransactions/get',
  async ({ userId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/notifications/yookassa/?userId=${userId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
