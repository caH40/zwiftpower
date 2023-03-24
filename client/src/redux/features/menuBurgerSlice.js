import { createSlice } from '@reduxjs/toolkit';

const menuBurgerSlice = createSlice({
  name: 'menuBurger',
  initialState: { isVisible: false },
  reducers: {
    showMenu: state => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showMenu } = menuBurgerSlice.actions;

export default menuBurgerSlice.reducer;
