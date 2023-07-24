import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../alertMessageSlice';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export const fetchUserPowerCurve = createAsyncThunk(
  'userPowerCurveGet/profile',
  async function ({ zwiftId }, thunkAPI) {
    try {
      const response = await axios({
        url: `${serverExpress}/api/race/profile/${zwiftId}/power/`,
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

const userPowerCurveSlice = createSlice({
  name: 'powerCurve',
  initialState: {
    powerFromEvents: [],
    powerCurve: {},

    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPowerCurve.pending, (state) => {
      state.powerFromEvents = [];
      state.powerCurve = {};
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUserPowerCurve.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.powerFromEvents = action.payload.powerFromEvents;
      state.powerCurve = action.payload.powerCurve;
    });
    builder.addCase(fetchUserPowerCurve.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default userPowerCurveSlice.reducer;
