import { createSlice } from '@reduxjs/toolkit';

import { raceResultsBtn } from '../../assets/navigate-buttons';

/**
 * Изменение состояния фильтра отображения таблиц для страницы "Результаты заезда"
 */
const filterRaceResultsPageSlice = createSlice({
  name: 'filterRaceResultsPage',
  initialState: { value: { name: 'Финишировавшие', column: 'results', isActive: true } },
  reducers: {
    setRaceResultsPage: (state, action) => {
      state.value = raceResultsBtn.find((value) => value.name === action.payload.name) || {};
    },
  },
});

export const { setRaceResultsPage } = filterRaceResultsPageSlice.actions;

export default filterRaceResultsPageSlice.reducer;
