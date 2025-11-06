import { createSlice } from '@reduxjs/toolkit';

const sortTableSlice = createSlice({
  name: 'sortTable',
  initialState: {
    activeSorting: null,
  },

  reducers: {
    // При запуске изменяет направление сортировки на противоположное (какое было в хранилище)
    // и устанавливает новое columnName.
    sortColumnTable(state, action) {
      const columnName = action.payload;
      const { isRasing } = state.activeSorting;

      state.activeSorting = { columnName, isRasing: !isRasing };
    },
    setSortColumnTable(state, action) {
      state.activeSorting = action.payload;
    },
    resetSortColumnTable(state) {
      state.activeSorting = null;
    },
  },
});

export const { sortColumnTable, resetSortColumnTable, setSortColumnTable } =
  sortTableSlice.actions;
export default sortTableSlice.reducer;
