import { createSlice } from '@reduxjs/toolkit';

import { fetchUserNotifications } from './fetchUserNotifications';

const initialState = {
  notifications: {
    news: false,
    events: false,
    development: false,
  },
  status: null,
  error: null,
};

const userNotificationsSlice = createSlice({
  name: 'getNotifications',
  initialState,
  reducers: {
    putNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
  },

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

export const { putNotifications } = userNotificationsSlice.actions;

export default userNotificationsSlice.reducer;
