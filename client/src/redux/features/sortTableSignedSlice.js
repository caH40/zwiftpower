import { createSlice } from '@reduxjs/toolkit';

/**
 * Слайс сортировки таблицы по столбцам и хранения текущей сортировки (activeSorting)
 */
const sortTableSignedSlice = createSlice({
  name: 'sortTableSchedule',
  initialState: { activeSorting: { columnName: 'Категория', isRasing: true } },
  reducers: {
    sortColumnTable(state, action) {
      const columnName = action.payload;
      const { isRasing } = state.activeSorting;

      state.activeSorting = { columnName, isRasing: !isRasing };
    },
    // сброс сортировки таблицы на сортировку по умолчанию
    resetSortingSigned(state) {
      state.activeSorting = { columnName: 'Категория', isRasing: true };
    },
  },
});

export const { sortColumnTable, resetSortingSigned } = sortTableSignedSlice.actions;
export default sortTableSignedSlice.reducer;
