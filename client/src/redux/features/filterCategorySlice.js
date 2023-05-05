import { createSlice } from '@reduxjs/toolkit';

const filterCategorySlice = createSlice({
  name: 'filterCategory',
  initialState: { value: { name: 'All', isActive: true } },
  reducers: {
    setFilterCategory(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setFilterCategory } = filterCategorySlice.actions;

export default filterCategorySlice.reducer;
