import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение данных об Организаторе.
 */
export const fetchGetOrganizerModerator = createAsyncThunk(
  'organizerOrganizerModerator/get',
  async ({ organizerId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/${organizerId}`,
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
 * Получение данных о Zwift бота-модератора для клубов в Звифте у Организатора.
 */
export const fetchGetOrganizerBotsModerator = createAsyncThunk(
  'organizerBotsModerator/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/bots`,
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
 * Обновление данных (генерация нового token) Zwift бота-модератора для клубов в Звифте у Организатора.
 */
export const fetchPutOrganizerBotsModerator = createAsyncThunk(
  'organizerBotsModerator/put',
  async ({ organizerId, username, password }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/bots`,
        method: 'put',
        data: { organizerId, username, password },
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
 * Удаление токена и данных Zwift бота-модератора для клубов в Звифте у Организатора.
 */
export const fetchDeleteOrganizerBotsModerator = createAsyncThunk(
  'organizerBotsModerator/delete',
  async ({ tokenId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/bots`,
        method: 'delete',
        data: { tokenId },
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
 * Получение Организаторов у которых пользователь userId является модератором.
 */
export const fetchGetOrganizersForModerator = createAsyncThunk(
  'organizersForModerator/get',
  async ({ userId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/organizers-for-moderator/${userId}`,
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
 * Обновление данных организатора (описание, изображения и т.д.).
 */
export const fetchPutOrganizersMainData = createAsyncThunk(
  'organizersMainData/put',
  async (dataFromForm, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/main`,
        method: 'put',
        data: dataFromForm,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
