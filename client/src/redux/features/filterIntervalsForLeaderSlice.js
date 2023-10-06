import { createSlice } from '@reduxjs/toolkit';

import { intervalsForLeader } from '../../assets/filters';

/**
 * Изменение состояния фильтра интервала при выборе соответствующего интервала
 */
const filterIntervalsForLeaderSlice = createSlice({
  name: 'filterIntervals',
  initialState: { value: { name: '15 сек', column: 15, isActive: true } },
  reducers: {
    setIntervalsForLeaders: (state, action) => {
      state.value =
        intervalsForLeader.find((value) => value.name === action.payload.name) || {};
    },
  },
});

export const { setIntervalsForLeaders } = filterIntervalsForLeaderSlice.actions;

export default filterIntervalsForLeaderSlice.reducer;
