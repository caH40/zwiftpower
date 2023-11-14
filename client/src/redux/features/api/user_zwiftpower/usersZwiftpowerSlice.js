import { createSlice } from '@reduxjs/toolkit';

import { fetchUsersZwiftpower } from './fetchUsersZwiftpower';

const initialState = {
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
  },
});

export const { resetUsers } = usersZwiftpowerSlice.actions;

export default usersZwiftpowerSlice.reducer;
