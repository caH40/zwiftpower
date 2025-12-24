import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
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
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
