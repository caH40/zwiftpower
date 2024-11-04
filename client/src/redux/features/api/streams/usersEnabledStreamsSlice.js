import { createSlice } from '@reduxjs/toolkit';

import { fetchUsersEnabledStreams } from './fetchUsersEnabledStreams';

const initialState = {
  streams: [],
  status: null,
  error: null,
};

const usersEnabledStreamsSlice = createSlice({
  name: 'getUserEnabledStreams',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsersEnabledStreams.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUsersEnabledStreams.fulfilled, (state, action) => {
      state.error = null;
      state.streams = action.payload.data;
      state.status = 'resolved';
    });

    builder.addCase(fetchUsersEnabledStreams.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

// export const { putNotifications, putStreams } = userEnabledStreamsSlice.actions;

export default usersEnabledStreamsSlice.reducer;
