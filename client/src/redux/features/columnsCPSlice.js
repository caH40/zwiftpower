import { createSlice } from '@reduxjs/toolkit';

const dataFromLocalStorage = JSON.parse(localStorage.getItem('columnsRaceResults'));
const initialState = {
  value: dataFromLocalStorage || [
    { id: 100, interval: 5, name: '5с', nameInMenu: '5 секунд', isVisible: true },
    { id: 101, interval: 15, name: '15с', nameInMenu: '15 секунд', isVisible: false },
    { id: 102, interval: 30, name: '30с', nameInMenu: '30 секунд', isVisible: true },
    { id: 103, interval: 60, name: '1м', nameInMenu: '1 минута', isVisible: true },
    { id: 104, interval: 180, name: '3м', nameInMenu: '3 минуты', isVisible: false },
    { id: 105, interval: 300, name: '5м', nameInMenu: '5 минут', isVisible: true },
    { id: 106, interval: 720, name: '12м', nameInMenu: '12 минут', isVisible: true },
    { id: 107, interval: 1200, name: '20м', nameInMenu: '20 минут', isVisible: true },
    { id: 108, interval: 1800, name: '30м', nameInMenu: '30 минут', isVisible: false },
    { id: 109, interval: 2400, name: '40м', nameInMenu: '40 минут', isVisible: true },
    { id: 110, interval: 3600, name: '60м', nameInMenu: '60 минут', isVisible: false },
  ],
};

const columnsCPSlice = createSlice({
  name: 'criticalPOwerColumns',
  initialState,
  reducers: {
    setColumnsCP(state, action) {
      const newColumns = state.value.map((cp) => {
        if (cp.nameInMenu === action.payload.nameInMenu) {
          cp.isVisible = action.payload.isVisible;
          return cp;
        }
        return cp;
      });
      state.value = newColumns;
      localStorage.setItem('columnsRaceResults', JSON.stringify(newColumns));
    },
  },
});

export const { setColumnsCP } = columnsCPSlice.actions;

export default columnsCPSlice.reducer;
