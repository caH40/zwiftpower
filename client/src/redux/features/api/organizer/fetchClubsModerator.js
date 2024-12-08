import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Получение получение клубов из БД для Организатора.
 */
export const fetchGetClubsZwiftModerator = createAsyncThunk(
  'organizerClubsModerator/get',
  async ({ organizerId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs/${organizerId}`,
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
 * Получение получение клубов из БД для модератора клубов.
 */
export const fetchGetClubsForModeratorZwiftModerator = createAsyncThunk(
  'organizerClubsForModerator/get',
  async ({ moderatorId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs-for-moderator/${moderatorId}`,
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
 * Получение получение клуба из Zwift для добавления Организатору.
 */
export const fetchGetClubZwiftModerator = createAsyncThunk(
  'organizerClubModerator/get',
  async ({ clubId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs/zwift/${clubId}`,
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
 * Удаление клуба из БД для Организатора.
 */
export const fetchDeleteClubsZwiftModerator = createAsyncThunk(
  'organizerClubsModerator/delete',
  async function ({ clubId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs`,
        method: 'delete',
        data: { clubId },
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
 * Добавление клуба в БД для Организатора.
 */
export const fetchPostClubsZwiftModerator = createAsyncThunk(
  'organizerClubsModerator/post',
  async function ({ club, organizerId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs`,
        method: 'post',
        data: { club, organizerId },
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
 * Добавление пользователя как модератора в клуб.
 */
export const fetchPutModeratorClubsZwiftModerator = createAsyncThunk(
  'organizerClubsModerator/addModerator',
  async function ({ userId, clubId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs/moderators`,
        method: 'put',
        data: { userId, clubId },
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
 * Удаление пользователя из модераторов клуба.
 */
export const fetchDeleteModeratorClubsZwiftModerator = createAsyncThunk(
  'organizerClubsModerator/deleteModerator',
  async function ({ userId, clubId }, thunkAPI) {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/clubs/moderators`,
        method: 'delete',
        data: { userId, clubId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
