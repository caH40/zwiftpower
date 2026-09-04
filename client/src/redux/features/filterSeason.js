import { createSlice } from '@reduxjs/toolkit';

import { seasonCurrentLabel } from '../../assets/constants';

const filterSeasonSlice = createSlice({
  name: 'filterSeason',
  initialState: { value: { seasonLabel: seasonCurrentLabel, isActive: true } },
  reducers: {
    setFilterSeason(state, action) {
      state.value = { seasonLabel: action.payload.name };
    },

    resetFilterSeason(state) {
      state.value = { seasonLabel: seasonCurrentLabel, isActive: true };
    },
  },
});

export const { setFilterSeason, resetFilterSeason } = filterSeasonSlice.actions;

export default filterSeasonSlice.reducer;
