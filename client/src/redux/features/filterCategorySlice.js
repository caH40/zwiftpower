import { createSlice } from '@reduxjs/toolkit';

const filterCategorySlice = createSlice({
  name: 'filterCategory',
  initialState: { value: { name: 'All', isActive: true } },
  reducers: {
    setFilterCategory(state, action) {
      state.value = action.payload;
    },
    resetFilterCategory(state) {
      state.value = { name: 'All', isActive: true };
    },
  },
});

export const { setFilterCategory, resetFilterCategory } = filterCategorySlice.actions;

export default filterCategorySlice.reducer;
