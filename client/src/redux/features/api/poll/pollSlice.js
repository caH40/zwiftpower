import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
      state.teamsLeaderboard = [];
    },
  },

  // extraReducers: (builder) => {
  //   // ============== получение всех команд =================
  //   builder.addCase(fetchPostPollAnswers.pending, (state) => {
  //     state.error = null;
  //     state.status = 'loading';
  //   });

  //   builder.addCase(fetchPostPollAnswers.fulfilled, (state, action) => {
  //     state.message = action.payload.data?.message;
  //     state.error = null;
  //     state.status = 'resolved';
  //   });

  //   builder.addCase(fetchPostPollAnswers.rejected, (state, action) => {
  //     state.status = 'rejected';
  //     state.error = action.payload;
  //   });
  // },
});

// export const {} = pollSlice.actions;

export default pollSlice.reducer;
