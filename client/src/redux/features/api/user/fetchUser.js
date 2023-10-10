import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { getAuth } from '../../authSlice';
import { checkAuth } from '../../../../api/auth-check';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

// привязка ZwiftId к аккаунту
export const fetchUserPut = createAsyncThunk(
  'user/putSettings',
  async function (zwiftId, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/user`,
        method: 'put',
        data: { zwiftId },
      });

      // запрос обновленных данных аккаунта с БД
      const auth = await checkAuth();

      if (auth) {
        thunkAPI.dispatch(getAuth({ status: true, user: auth.data.user }));
        localStorage.setItem('accessToken', auth.data.accessToken);
      } else {
        throw new Error('Ошибка при запросе авторизации');
      }

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
