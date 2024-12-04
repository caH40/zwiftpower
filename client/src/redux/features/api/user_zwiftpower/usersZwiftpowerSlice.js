import { createSlice } from '@reduxjs/toolkit';

import { fetchUsersZwiftpower, fetchUsersZwiftpowerForModerator } from './fetchUsersZwiftpower';

const initialState = {
  usersForModerator: [],
  users: [],
  status: null,
  error: null,
};

const usersZwiftpowerSlice = createSlice({
  name: 'eventPost',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.usersForModerator = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsersZwiftpower.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUsersZwiftpower.fulfilled, (state, action) => {
      state.users = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUsersZwiftpower.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ====================== данные пользователей при запросе модератором  ======================
    builder.addCase(fetchUsersZwiftpowerForModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUsersZwiftpowerForModerator.fulfilled, (state, action) => {
      state.usersForModerator = action.payload;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUsersZwiftpowerForModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetUsers } = usersZwiftpowerSlice.actions;

export default usersZwiftpowerSlice.reducer;
