import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myAxios } from '../../api/axios';

import { getAlert } from './alertMessageSlice';

export const fetchInfoDev = createAsyncThunk(
  'informationDevelopment/postInfoDev',
  async function ({ releaseDate, description }, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/information/development',
        method: 'post',
        data: {
          releaseData: {
            releaseDate,
            description,
          },
        },
      });

      const { message } = response.data;
      thunkAPI.dispatch(getAlert({ message, type: 'success', isOpened: true }));
      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const popupFormSlice = createSlice({
  name: 'popupForm',
  initialState: {
    isVisible: false,
    error: null,
    status: null,
    response: {},
  },
  reducers: {
    openPopupForm(state) {
      state.isVisible = true;
    },
    closePopupForm(state) {
      state.isVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInfoDev.pending, (state) => {
      state.error = null;
      state.response = null;
      state.status = 'loading';
    });
    builder.addCase(fetchInfoDev.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(fetchInfoDev.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { openPopupForm, closePopupForm } = popupFormSlice.actions;

export default popupFormSlice.reducer;
