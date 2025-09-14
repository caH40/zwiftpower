import { createSlice } from '@reduxjs/toolkit';

import { fetchTeamMembers } from './fetchTeamMember';

const initialState = {
  teamMembers: [],
  message: null,
  status: null,
  error: null,
};

/**
 * Редукторы для работы с сущностью Участник Команды.
 */
const teamMemberSlice = createSlice({
  name: 'teamMembers',
  initialState,
  reducers: {
    resetTeamMembers: (state) => {
      state.teamMembers = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение всех участников команды =================
    builder.addCase(fetchTeamMembers.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchTeamMembers.fulfilled, (state, action) => {
      state.teamMembers = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchTeamMembers.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetTeamMembers } = teamMemberSlice.actions;

export default teamMemberSlice.reducer;
