import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
