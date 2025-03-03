import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: { name: 'Главная', isActive: true } };

const menuOrganizerSeriesSlice = createSlice({
  name: 'menuOrganizerSeries',
  initialState,
  reducers: {
    setCurrentMenuItem(state, action) {
      state.value = action.payload;
    },

    resetCurrentMenuItem(state) {
      state.value = initialState.value;
    },
  },
});

export const { setCurrentMenuItem, resetCurrentMenuItem } = menuOrganizerSeriesSlice.actions;

export default menuOrganizerSeriesSlice.reducer;
