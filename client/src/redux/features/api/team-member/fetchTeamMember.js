import { createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { handlerErrorAsyncThunk } from '../utils/handler-error';

/**
 * Получение всех участников команды.
 */
export const fetchTeamMembers = createAsyncThunk(
  'teamMembers/getAll',
  async ({ urlSlug }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/team-members/${urlSlug}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Выход из состава команды.
 */
export const fetchPostLeaveTeam = createAsyncThunk(
  'leaveFromTeam/post',
  async ({ urlSlug }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/team-members/leave`,
        method: 'post',
        data: { urlSlug },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);

/**
 * Управление участниками команды.
 */
export const fetchControlMembers = createAsyncThunk(
  'controlMembers/post',
  async ({ action, userId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/team-members`,
        method: 'post',
        data: { action, teamMemberId: userId },
      });

      return response.data;
    } catch (error) {
      return handlerErrorAsyncThunk({ error, thunkAPI });
    }
  }
);
