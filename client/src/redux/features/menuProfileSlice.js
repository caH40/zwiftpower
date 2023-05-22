import { createSlice } from '@reduxjs/toolkit';

import { profileButtons } from '../../asset/profile-buttons';

const menuProfileSlice = createSlice({
  name: 'menuProfile',
  initialState: { menuProfileState: { page: 'results', name: 'Результаты', isActive: true } },
  reducers: {
    setProfilePage(state, action) {
      state.menuProfileState = profileButtons.find(
        (button) => button.name === action.payload.name
      );
    },
    resetProfilePage(state) {
      state.menuProfileState = { page: 'results', name: 'Результаты', isActive: true };
    },
  },
});

export const { setProfilePage, resetProfilePage } = menuProfileSlice.actions;

export default menuProfileSlice.reducer;
