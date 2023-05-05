import { createSlice } from '@reduxjs/toolkit';

const filterWattsSlice = createSlice({
  name: 'filterWatts',
  initialState: { value: { name: 'вт/кг', column: 'wattsKg', isActive: true } },
  reducers: {
    setWattsCategory(state, action) {
      const values = [
        { name: 'вт/кг', column: 'wattsKg' },
        { name: 'ватты', column: 'watts' },
      ];
      state.value = values.find((value) => value.name === action.payload.name) || {};
    },
  },
});

export const { setWattsCategory } = filterWattsSlice.actions;

export default filterWattsSlice.reducer;
