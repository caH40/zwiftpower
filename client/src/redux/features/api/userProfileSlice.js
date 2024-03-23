import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';
import { setValueMax } from '../../../utils/value-max';
import { serverExpress } from '../../../config/environment';

/**
 * Запрос на получение профиля райдера
 */
export const fetchUserProfile = createAsyncThunk(
  'userProfileGet/profile',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/profile/${zwiftId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: {},
    powerCurve: {},
    quantityRace: null,

    status: null,
    error: null,
  },
  reducers: {
    resetUserProfile: (state) => {
      state.profile = {};
      state.powerCurve = {};
      state.quantityRace = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.profile = action.payload.profile;
      state.powerCurve = action.payload.powerCurve;
      state.quantityRace = action.payload.quantityRace;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
