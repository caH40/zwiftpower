import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Отправка данных как проголосовал пользователь.
 */
export const fetchPostPollAnswers = createAsyncThunk(
  'poll/getAll',
  async ({ answers }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/poll/answers`,
        method: 'post',
        data: { answers },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
