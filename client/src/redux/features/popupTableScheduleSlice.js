import { createSlice } from '@reduxjs/toolkit';

const popupTableScheduleSlice = createSlice({
  name: 'popupTableSchedule',
  initialState: { menus: [] },
  reducers: {
    createScheduleMenus(state, action) {
      const menus = action.payload.map((event) => ({ eventId: event.id, isVisible: false }));
      state.menus = menus;
    },
    showScheduleMenu(state, action) {
      for (const menu of state.menus) {
        if (menu.eventId === action.payload) {
          menu.isVisible = !menu.isVisible;
        } else {
          menu.isVisible = false;
        }
      }
    },
    closeScheduleMenu(state, action) {
      for (const menu of state.menus) {
        if (menu.eventId === action.payload) {
          menu.isVisible = false;
        }
      }
    },
  },
});

export const { createScheduleMenus, showScheduleMenu, closeScheduleMenu } =
  popupTableScheduleSlice.actions;

export default popupTableScheduleSlice.reducer;
