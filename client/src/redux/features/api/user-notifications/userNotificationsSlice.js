import { createSlice } from '@reduxjs/toolkit';

import { fetchUserNotifications } from './fetchUserNotifications';

const initialState = {
  notifications: {
    news: true,
    development: true,
    events: true,
  },
  status: null,
  error: null,
};

const userNotificationsSlice = createSlice({
  name: 'getNotifications',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUserNotifications.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUserNotifications.fulfilled, (state, action) => {
      state.error = null;
      state.notifications = action.payload.data.notifications;
      state.status = 'resolved';
    });

    builder.addCase(fetchUserNotifications.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default userNotificationsSlice.reducer;
