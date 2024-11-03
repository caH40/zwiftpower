import { createSlice } from '@reduxjs/toolkit';

import { fetchPutUserNotifications } from './fetchUserNotifications';

const initialState = {
  status: null,
  error: null,
};

const putUserNotificationsSlice = createSlice({
  name: 'putNotifications',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPutUserNotifications.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutUserNotifications.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutUserNotifications.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default putUserNotificationsSlice.reducer;
