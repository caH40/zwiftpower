import { createSlice } from '@reduxjs/toolkit';

const popupTableResultsListSlice = createSlice({
  name: 'popupTableResultsList',
  initialState: { menus: [] },
  reducers: {
    createResultListMenus(state, action) {
      const menus = action.payload.map((event) => ({ eventId: event.id, isVisible: false }));
      state.menus = menus;
    },
    showResultListMenu(state, action) {
      for (const menu of state.menus) {
        if (menu.eventId === action.payload) {
          menu.isVisible = !menu.isVisible;
        } else {
          menu.isVisible = false;
        }
      }
    },
    closeResultListMenu(state, action) {
      for (const menu of state.menus) {
        if (menu.eventId === action.payload) {
          menu.isVisible = false;
        }
      }
    },
  },
});

export const { createResultListMenus, showResultListMenu, closeResultListMenu } =
  popupTableResultsListSlice.actions;

export default popupTableResultsListSlice.reducer;
