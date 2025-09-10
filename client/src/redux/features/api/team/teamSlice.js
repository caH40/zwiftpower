import { createSlice } from '@reduxjs/toolkit';

import { fetchGetTeams } from './fetchTeam';

const initialState = {
  teams: [],
  team: null,
  message: null,
  status: null,
  error: null,
};

/**
 * Редукторы для работы с сущностью Команда.
 */
const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    resetTeams: (state) => {
      state.teams = [];
    },
    resetTeam: (state) => {
      state.team = null;
    },
  },

  extraReducers: (builder) => {
    // ============== получение всех команд =================
    builder.addCase(fetchGetTeams.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetTeams.fulfilled, (state, action) => {
      state.teams = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetTeams.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetTeam, resetTeams } = teamSlice.actions;

export default teamSlice.reducer;
