import { createSlice } from '@reduxjs/toolkit';

import { setValueMax } from '../../../../utils/value-max';

import {
  fetchGetBannedRiders,
  fetchGetPendingRiders,
  fetchGetRiderResults,
  fetchGetTeam,
  fetchGetTeams,
} from './fetchTeam';

const initialState = {
  teams: [],
  teamRiderResults: [],
  pendingRiders: [],
  bannedRiders: [],
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
    resetPendingRiders: (state) => {
      state.pendingRiders = [];
    },
    resetBannedRiders: (state) => {
      state.bannedRiders = [];
    },
    resetTeam: (state) => {
      state.team = null;
    },
    resetTeamMessage: (state) => {
      state.message = null;
    },
    resetTeamRiderResults: (state) => {
      state.teamRiderResults = [];
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
    // ============== получение команды =================
    builder.addCase(fetchGetTeam.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetTeam.fulfilled, (state, action) => {
      state.team = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetTeam.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    // ============== пользователи, которые подали заявку на вступление в команду =================
    builder.addCase(fetchGetPendingRiders.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetPendingRiders.fulfilled, (state, action) => {
      state.pendingRiders = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetPendingRiders.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== заблокированные пользователи =================
    builder.addCase(fetchGetBannedRiders.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetBannedRiders.fulfilled, (state, action) => {
      state.bannedRiders = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetBannedRiders.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== результатов заездов райдеров =================
    builder.addCase(fetchGetRiderResults.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetRiderResults.fulfilled, (state, action) => {
      state.teamRiderResults = setValueMax(action.payload.data);
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetRiderResults.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const {
  resetTeam,
  resetTeams,
  resetPendingRiders,
  resetBannedRiders,
  resetTeamRiderResults,
} = teamSlice.actions;

export default teamSlice.reducer;
