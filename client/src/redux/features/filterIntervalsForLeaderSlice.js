import { createSlice } from '@reduxjs/toolkit';

const filterIntervalsForLeaderSlice = createSlice({
  name: 'filterIntervals',
  initialState: { value: { name: '15 сек', column: 15, isActive: true } },
  reducers: {
    setIntervalsForLeaders: (state, action) => {
      const values = [
        { name: '15 сек', column: 15 },
        { name: '1 мин', column: 60 },
        { name: '5 мин', column: 300 },
        { name: '20 мин', column: 1200 },
      ];
      state.value = values.find((value) => value.name === action.payload.name) || {};
    },
  },
});

export const { setIntervalsForLeaders } = filterIntervalsForLeaderSlice.actions;

export default filterIntervalsForLeaderSlice.reducer;
