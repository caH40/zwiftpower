import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение всех команд.
 */
export const fetchGetTeams = createAsyncThunk('teams/getAll', async (_, thunkAPI) => {
  try {
    const response = await myAxios({
      url: `${serverExpress}/api/teams`,
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
 * Получение команды.
 */
export const fetchGetTeam = createAsyncThunk('teams/get', async ({ urlSlug }, thunkAPI) => {
  try {
    const response = await myAxios({
      url: `${serverExpress}/api/teams/${urlSlug}`,
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
 * Создание команды.
 */
export const fetchPostTeam = createAsyncThunk('teams/post', async ({ team }, thunkAPI) => {
  try {
    const response = await myAxios({
      url: `${serverExpress}/api/teams`,
      method: 'post',
      data: team,
      headers: { 'Content-type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message;
    thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Обновление данных команды.
 */
export const fetchPutTeam = createAsyncThunk('teams/put', async ({ team }, thunkAPI) => {
  try {
    const response = await myAxios({
      url: `${serverExpress}/api/teams`,
      method: 'put',
      data: team,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message;
    thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Заявка на вступление в команду.
 */
export const fetchPostJoinRequestInTeam = createAsyncThunk(
  'teams/put',
  async ({ urlSlug }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/teams/join-request`,
        method: 'post',
        data: { urlSlug },
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
 * Получения списка пользователей, которые подали заявку на вступление в команду.
 */
export const fetchGetPendingRiders = createAsyncThunk(
  'pendingRiders/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/teams/pending-riders`,
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

/**
 * Получения списка заблокированных пользователей.
 */
export const fetchGetBannedRiders = createAsyncThunk(
  'bannedRiders/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/teams/banned-riders`,
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

/**
 * Получения результатов заездов райдеров.
 */
export const fetchGetRiderResults = createAsyncThunk(
  'teamRiderResults/get',
  async ({ urlSlug, docsOnPage, page }, thunkAPI) => {
    try {
      const search = `docsOnPage=${docsOnPage}&page=${page}`;

      const url = new URL(`${serverExpress}/api/teams/results/${urlSlug}`);
      url.searchParams.append('page', page);
      url.searchParams.append('docsOnPage', docsOnPage);

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

/**
 * Получения статистики и метрики по команде и её участникам.
 */
export const fetchGetTeamStatistics = createAsyncThunk(
  'teamStatistics/get',
  async ({ urlSlug }, thunkAPI) => {
    try {
      const url = new URL(`${serverExpress}/api/teams/statistics/${urlSlug}`);

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

/**
 * Рейтинг команд с данными по медалям, количеству участников, количеству заездов.
 */
export const fetchTeamsLeaderboard = createAsyncThunk(
  'teamsLeaderboard/fetch',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/statistics/teams`,
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
