import { createSlice } from '@reduxjs/toolkit';

const filterGenderSlice = createSlice({
  name: 'filterGender',
  initialState: { value: { name: 'All', isActive: true } },
  reducers: {
    setFilterGender(state, action) {
      const { payload } = action;
      let male;
      switch (payload.name) {
        case 'М':
          male = true;
          break;

        case 'Ж':
          male = false;
          break;

        default:
          break;
      }

      state.value = { ...payload, male };
    },
    resetFilterGender(state) {
      state.value = { name: 'All', isActive: true };
    },
  },
});

export const { setFilterGender, resetFilterGender } = filterGenderSlice.actions;

export default filterGenderSlice.reducer;
