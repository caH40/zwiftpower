import { createSlice } from '@reduxjs/toolkit';

const sortTableSlice = createSlice({
  name: 'sortTable',
  initialState: {
    activeSorting: null,
    componentId: null,
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
      const { columnName, componentId, isRasing } = action.payload;
      state.activeSorting = { columnName, isRasing };
      state.componentId = componentId;
    },
    resetSortColumnTable(state) {
      state.activeSorting = null;
      state.componentId = null;
    },
  },
});

export const { sortColumnTable, resetSortColumnTable, setSortColumnTable } =
  sortTableSlice.actions;
export default sortTableSlice.reducer;
