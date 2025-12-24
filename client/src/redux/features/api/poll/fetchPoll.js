import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
    return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
        method: 'delete',
        data: { pollId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
