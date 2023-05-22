import { createSlice } from '@reduxjs/toolkit';

const menuProfileSlice = createSlice({
  name: 'menuProfile',
  initialState: { menuProfileState: { name: 'Результаты', isActive: true } },
  reducers: {
    setProfilePage(state, action) {
      state.menuProfileState = action.payload;
    },
    resetProfilePage(state) {
      state.menuProfileState = { name: 'Результаты', isActive: true };
    },
  },
});

export const { setProfilePage, resetProfilePage } = menuProfileSlice.actions;

export default menuProfileSlice.reducer;
