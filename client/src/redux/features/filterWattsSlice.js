import { createSlice } from '@reduxjs/toolkit';

const filterWattsSlice = createSlice({
  name: 'filterWatts',
  initialState: { value: { name: 'ватты', isActive: true } },
  reducers: {
    setWattsCategory(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setWattsCategory } = filterWattsSlice.actions;

export default filterWattsSlice.reducer;
