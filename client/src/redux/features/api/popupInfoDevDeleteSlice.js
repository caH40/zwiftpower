import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';

import { getAlert } from '../alertMessageSlice';

import { fetchGetInfoDev } from './popupInfoDevGetSlice';

export const fetchDeleteInfoDev = createAsyncThunk(
  'informationDevelopment/deleteInfoDev',
  async function ({ id }, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/information/development',
        method: 'delete',
        data: { id },
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

const popupInfoDevDeleteSlice = createSlice({
  name: 'popupForm',
  initialState: {
    error: null,
    status: null,
    informationDev: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteInfoDev.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchDeleteInfoDev.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(fetchDeleteInfoDev.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default popupInfoDevDeleteSlice.reducer;
