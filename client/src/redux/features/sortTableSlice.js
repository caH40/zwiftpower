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
  },
});

export const { sortColumnTable } = sortTableSlice.actions;
export default sortTableSlice.reducer;
