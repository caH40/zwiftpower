import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение голосование по _id.
 */
export const fetchGetPoll = createAsyncThunk('poll/get', async ({ pollId }, thunkAPI) => {
  try {
    const response = await myAxios({
      url: `${serverExpress}/api/poll/${pollId}`,
      method: 'get',
    });

    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message;
    thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Отправка данных как проголосовал пользователь.
 */
export const fetchPostPollAnswers = createAsyncThunk(
  'pollAnswers/post',
  async ({ selectedOptionIds, pollId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/poll/answers`,
        method: 'post',
        data: { selectedOptionIds, pollId },
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
 * Удаление голоса пользователя из голосования.
 */
export const fetchDeletePollAnswers = createAsyncThunk(
  'pollAnswers/delete',
  async ({ pollId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/poll/answers`,
        method: 'post',
        data: { pollId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
