import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetOrganizerBotsModerator,
  fetchGetOrganizerModerator,
  fetchGetOrganizersForModerator,
  fetchPutOrganizerBotsModerator,
  fetchPutOrganizersMainData,
} from './fetchOrganizerModerator';

const initialState = {
  tokens: [],
  organizersForModerator: [],
  organizerForModerator: 0,
  organizer: {},
  clubs: [], // получение клубов для Организатора в одно запросе вместе с главными данными Организатора.
  organizerUpdated: null, // Сообщение после удачного обновления главных данных Организатора.
  status: null,
  error: null,
};

/**
 * Слайс Обновление token Zwift бота-модератора для клубов в Звифте у Организатора.
 */
const organizerModeratorSlice = createSlice({
  name: 'organizerBotsModerator',
  initialState,
  reducers: {
    resetOrganizerModerator(state) {
      state.tokens = [];
    },
    resetOrganizerDataModerator(state) {
      state.organizer = {};
      state.organizerForModerator = 0;
      state.clubs = [];
      state.organizerUpdated = null;
    },
    reducerSelectOrganizersForModerator(state, action) {
      state.organizerForModerator = action.payload;
    },
    setOrganizersForModerator(state, action) {
      state.organizerForModerator = action.payload;
    },
  },

  extraReducers: (builder) => {
    // ============== получение данных об Организаторе =================
    builder.addCase(fetchGetOrganizerModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOrganizerModerator.fulfilled, (state, action) => {
      state.organizer = action.payload.data.organizer;
      state.clubs = action.payload.data.clubs;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOrganizerModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    // ============== получение данных о боте zwift=================
    builder.addCase(fetchGetOrganizerBotsModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOrganizerBotsModerator.fulfilled, (state, action) => {
      state.tokens = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOrganizerBotsModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== обновление token zwift=================
    builder.addCase(fetchPutOrganizerBotsModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutOrganizerBotsModerator.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutOrganizerBotsModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== обновление token zwift=================
    builder.addCase(fetchGetOrganizersForModerator.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetOrganizersForModerator.fulfilled, (state, action) => {
      const organizers = action.payload.data;
      state.organizersForModerator = organizers;
      // state.organizerForModerator = organizers[0]?._id;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetOrganizersForModerator.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== обновление главных данных Организатора =================
    builder.addCase(fetchPutOrganizersMainData.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutOrganizersMainData.fulfilled, (state, action) => {
      state.organizerUpdated = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutOrganizersMainData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const {
  resetOrganizerModerator,
  resetOrganizerDataModerator,
  reducerSelectOrganizersForModerator,
  setOrganizersForModerator,
} = organizerModeratorSlice.actions;

export default organizerModeratorSlice.reducer;
