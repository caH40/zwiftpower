import { createSlice } from '@reduxjs/toolkit';

const sortTableSlice = createSlice({
  name: 'sortTable',
  initialState: { activeSorting: { columnName: 'Время', isRasing: true } },
  reducers: {
    sortColumnTable(state, action) {
      const columnName = action.payload;
      const { isRasing } = state.activeSorting;

      state.activeSorting = { columnName, isRasing: !isRasing };
    },
    resetSorting(state) {
      state.activeSorting = { columnName: 'Время', isRasing: true };
    },
  },
});

export const { sortColumnTable, resetSorting } = sortTableSlice.actions;
export default sortTableSlice.reducer;
