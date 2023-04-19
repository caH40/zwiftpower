import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    value: {
      isActive: false,
      opacity: 1,
      picture: 1,
    },
  },
  reducers: {
    setBackground(state, action) {
      const quantityPictures = 5;
      state.value.isActive = action.payload.isActive;
      state.value.opacity = action.payload.isActive ? action.payload.isActive : 1;
      state.value.picture = Math.floor(Math.random() * quantityPictures) + 1;
    },
  },
});

export const { setBackground } = backgroundSlice.actions;

export default backgroundSlice.reducer;
