import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  formType: null, // 'setCategory', 'setPenalty', 'setDisqualification'
  formProps: {}, // Дополнительные данные для формы.
};

/**
 * Редуктор управления попап окном с формами.
 */
const popupFormContainerSlice = createSlice({
  name: 'popupFormNew',
  initialState,
  reducers: {
    openPopupFormContainer(state, action) {
      state.isVisible = true;
      state.formType = action.payload.formType;
      state.formProps = action.payload.formProps || {};
    },
    closePopupFormContainer(state) {
      state.isVisible = false;
      state.formType = null;
      state.formProps = {};
    },
  },
});

export const { openPopupFormContainer, closePopupFormContainer } =
  popupFormContainerSlice.actions;
export default popupFormContainerSlice.reducer;
