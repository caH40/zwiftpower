import { createSlice } from '@reduxjs/toolkit';

import { fetchDeletePollAnswers, fetchGetPoll, fetchPostPollAnswers } from './fetchPoll';

const initialState = {
  poll: null,
  message: null,
  status: null,
  error: null,
};

/**
 * Редукторы для работы с сущностью Голосование (Poll).
 */
const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    resetPoll(state) {
      state.poll = null;
    },
  },

  extraReducers: (builder) => {
    // ============== получение голосования =================
    builder.addCase(fetchGetPoll.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetPoll.fulfilled, (state, action) => {
      state.poll = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetPoll.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== сохранение голоса пользователя в голосовании =================
    builder.addCase(fetchPostPollAnswers.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPostPollAnswers.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.poll = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPostPollAnswers.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== удаление голоса пользователя в голосовании =================
    builder.addCase(fetchDeletePollAnswers.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDeletePollAnswers.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.poll = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDeletePollAnswers.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetPoll } = pollSlice.actions;

export default pollSlice.reducer;
