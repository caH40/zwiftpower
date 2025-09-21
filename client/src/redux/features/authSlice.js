import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { serverExpress } from '../../config/environment';
import { lsAccessToken } from '../../constants/localstorage';

export const checkAuth = createAsyncThunk('auth/getAuth', async () => {
  try {
    // запускается при первом запуске браузера, если refreshToken "живой" придет новый accessToken
    // и произойдет авторизация авторизация в браузере
    const response = await axios({
      method: 'post',
      url: `${serverExpress}/api/auth/refresh`,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
});

const initialState = {
  status: 'idle',
  error: null,
  value: {
    status: false,
    user: {
      isModeratorClub: false,
      email: '',
      id: '',
      zwiftId: '',
      role: '',
      moderator: { clubs: [] },
      username: '',
      photoProfile: '',
      externalAccounts: {
        vk: {
          id: null,
          firstName: null,
          lastName: null,
          avatarSrc: null,
          gender: null,
          birthday: null,
          email: null,
        },
      },
    },
  },
};

const authSlice = createSlice({
  name: 'checkAuth',
  initialState,
  reducers: {
    getAuth(state, action) {
      const { status, user } = action.payload;
      // Если есть клуб(ы) в модерации пользователя, то isModeratorClub:true
      const isModeratorClub = !!user?.moderator?.clubs?.length;
      state.value = { status, user: { ...user, isModeratorClub } };
    },
    resetAuth(state) {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      const data = action.payload;

      // Если не авторизован, то состояние инициализации, а статус фетча status='resolved'.
      if (!data || !data.success) {
        state.value = initialState.value;
        state.error = null;
        state.status = 'resolved';
        return;
      }

      state.value = { status: true, user: data.user };
      localStorage.setItem(lsAccessToken, data.accessToken);
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state = { status: false, user: {} };
      localStorage.setItem(lsAccessToken, '');
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { getAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
