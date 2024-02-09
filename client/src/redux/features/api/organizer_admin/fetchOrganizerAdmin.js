import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * добавление,удаление Организаторов заездов в БД сайта
 */
export const fetchGetOrganizerAdmin = createAsyncThunk(
  'organizerAdmin/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/organizers`,
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

export const fetchPostOrganizerAdmin = createAsyncThunk(
  'organizerAdmin/post',
  async (organizer, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/organizers`,
        method: 'post',
        data: organizer,
      });

      thunkAPI.dispatch(fetchGetOrganizerAdmin());
      thunkAPI.dispatch(
        getAlert({
          message: response.data.message,
          type: 'success',
          isOpened: true,
        })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchDeleteOrganizerAdmin = createAsyncThunk(
  'organizerAdmin/delete',
  async (organizerId, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/admin/organizers`,
        method: 'delete',
        data: { organizerId },
      });

      thunkAPI.dispatch(fetchGetOrganizerAdmin());
      thunkAPI.dispatch(
        getAlert({
          message: response.data.message,
          type: 'success',
          isOpened: true,
        })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
