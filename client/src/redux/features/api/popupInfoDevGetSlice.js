import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

export const fetchGetInfoDev = createAsyncThunk(
  'informationDevelopment/getInfoDev',
  async function (_, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/information/development`,
        method: 'get',
      });

      return response.data.informationDev;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const popupInfoDevGetSlice = createSlice({
  name: 'popupForm',
  initialState: {
    error: null,
    status: null,
    informationDev: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetInfoDev.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchGetInfoDev.fulfilled, (state, action) => {
      state.informationDev = action.payload;
      state.status = 'resolved';
    });
    builder.addCase(fetchGetInfoDev.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default popupInfoDevGetSlice.reducer;
