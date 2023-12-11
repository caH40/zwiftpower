import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../../api/axios';
import { getAlert } from '../alertMessageSlice';

/**
 * Обновление данных пользователя на сайте zwiftpower.ru с данных zwiftAPI
 */
export const fetchProfileRefresh = createAsyncThunk(
  'profile/refresh',
  async function (_, thunkAPI) {
    try {
      const response = await myAxios({
        url: '/api/race/profile/my',
        method: 'put',
      });
      thunkAPI.dispatch(
        getAlert({ message: response.data?.message, type: 'success', isOpened: true })
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const profileRefreshSlice = createSlice({
  name: 'profileRefresh',
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileRefresh.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchProfileRefresh.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });
    builder.addCase(fetchProfileRefresh.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default profileRefreshSlice.reducer;
