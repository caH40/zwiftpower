import { createSlice } from '@reduxjs/toolkit';

/**
 * Слайс сортировки таблицы по столбцам и хранения текущей сортировки (activeSorting)
 */
const sortTableSignedSlice = createSlice({
  name: 'sortTableSchedule',
  initialState: { activeSorting: { columnName: 1200, isRasing: true } },
  reducers: {
    sortColumnTable(state, action) {
      const columnName = action.payload;
      const { isRasing } = state.activeSorting;

      state.activeSorting = { columnName, isRasing: !isRasing };
    },
    resetSorting(state) {
      state.activeSorting = { columnName: 1200, isRasing: true };
    },
  },
});

export const { sortColumnTable, resetSorting } = sortTableSignedSlice.actions;
export default sortTableSignedSlice.reducer;
