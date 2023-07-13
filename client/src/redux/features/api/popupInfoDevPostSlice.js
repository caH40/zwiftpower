// пост запрос (добавление информации о релизе)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';

import { getAlert } from '../alertMessageSlice';

import { fetchGetInfoDev } from './popupInfoDevGetSlice';

export const fetchPostInfoDev = createAsyncThunk(
  'informationDevelopment/postInfoDev',
  async function (releaseData, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/information/development',
        method: 'post',
        data: { releaseData },
      });

      const { message } = response.data;
      thunkAPI.dispatch(getAlert({ message, type: 'success', isOpened: true }));
      // обновление списка релизов на главной странице, после добавления нового релиза в БД
      thunkAPI.dispatch(fetchGetInfoDev());
      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const popupInfoDevPostSlice = createSlice({
  name: 'popupForm',
  initialState: {
    error: null,
    status: null,
    response: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostInfoDev.pending, (state) => {
      state.error = null;
      state.response = null;
      state.status = 'loading';
    });
    builder.addCase(fetchPostInfoDev.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(fetchPostInfoDev.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default popupInfoDevPostSlice.reducer;
