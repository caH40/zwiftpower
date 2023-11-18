import { createSlice } from '@reduxjs/toolkit';

/**
 * Редьюсеры для модального окна изменения параметров Эвена
 */
const initialState = { isVisible: false, inputParams: {} };

const popupInputSlice = createSlice({
  name: 'popupInput',
  initialState,
  reducers: {
    // открытие модального окна, содержимое окна зависит от inputParams
    getPopupInput(state, action) {
      state.isVisible = action.payload.isVisible;
      state.inputParams = action.payload.inputParams;
    },
    closePopupInput(state) {
      state.isVisible = false;
    },
    // очистка объекта inputParams после закрытия модального окна
    resetPopupInput(state) {
      state.inputParams = {};
    },
  },
});

export const { getPopupInput, closePopupInput, resetPopupInput } = popupInputSlice.actions;

export default popupInputSlice.reducer;
