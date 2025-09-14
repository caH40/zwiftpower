import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
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
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
