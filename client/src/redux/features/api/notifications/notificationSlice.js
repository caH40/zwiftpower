import { createSlice } from '@reduxjs/toolkit';

import { getNotificationLetterPreview, sendNotification } from './sendNotification';

const initialState = {
  letterPreview: null,
  status: null,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notificationToEmail',
  initialState,
  reducers: {
    resetNotification(state) {
      state.letterPreview = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationLetterPreview.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(getNotificationLetterPreview.fulfilled, (state, action) => {
      state.letterPreview = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(getNotificationLetterPreview.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ===============================   ===============================
    builder.addCase(sendNotification.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(sendNotification.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(sendNotification.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
