import { createSlice } from '@reduxjs/toolkit';

import { fetchUserSettings } from './fetchUserSettings';

const initialState = {
  notifications: {
    news: false,
    events: false,
    development: false,
  },
  streams: {
    twitch: {
      channelName: '',
      isEnabled: false,
    },
    streamingRestricted: false,
  },
  status: null,
  error: null,
};

const userSettingsSlice = createSlice({
  name: 'getUserSettings',
  initialState,
  reducers: {
    // Обновление notifications в хранилище данными, пришедшими с сервера после изменения настроек. (checkbox)
    putNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },

    putStreams: (state, action) => {
      state.streams = action.payload.streams;
    },

    resetUserSettings: (state) => {
      state.notifications = initialState.notifications;
      state.streams = initialState.streams;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserSettings.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUserSettings.fulfilled, (state, action) => {
      state.error = null;
      state.notifications = action.payload.data.notifications;
      state.streams = action.payload.data.streams;
      state.status = 'resolved';
    });

    builder.addCase(fetchUserSettings.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { putNotifications, putStreams, resetUserSettings } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
