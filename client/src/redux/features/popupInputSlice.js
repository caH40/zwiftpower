import { createSlice } from '@reduxjs/toolkit';

const popupInputSlice = createSlice({
  name: 'popupInput',
  initialState: { isVisible: false, inputParams: {} },
  reducers: {
    getPopupInput(state, action) {
      state.isVisible = action.payload.isVisible;
      state.inputParams = action.payload.inputParams;
    },
    closePopupInput(state) {
      state.isVisible = false;
      state.inputParams = {};
    },
  },
});

export const { getPopupInput, closePopupInput } = popupInputSlice.actions;

export default popupInputSlice.reducer;
