import { createSlice } from '@reduxjs/toolkit';

const sortTableSlice = createSlice({
  name: 'sortTable',
  initialState: {},

  reducers: {
    sortColumnTable(state, action) {
      const columnName = action.payload;
      const { isRasing } = state.activeSorting;

      state.activeSorting = { columnName, isRasing: !isRasing };
    },
    initialSorting(state, action) {
      state.activeSorting = action.payload;
    },
  },
});

export const { sortColumnTable, initialSorting } = sortTableSlice.actions;
export default sortTableSlice.reducer;
