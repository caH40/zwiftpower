// открытие и закрытие попап меню, пост запрос (добавление информации о релизе)
import { createSlice } from '@reduxjs/toolkit';

const popupFormSlice = createSlice({
  name: 'popupForm',
  initialState: {
    isVisible: false,
    method: 'post',
    releaseData: { releaseDate: Date.now(), text: '', version: '' },
  },
  reducers: {
    openPopupForm(state, action) {
      state.isVisible = true;
      state.releaseData = action.payload.releaseData;
      state.method = action.payload.method;
    },
    closePopupForm(state) {
      state.isVisible = false;
    },
    // двустороннее связывание input/textarea
    setPopupForm(state, action) {
      state.releaseData = { ...state.releaseData, ...action.payload };
    },
  },
});

export const { openPopupForm, closePopupForm, setPopupForm } = popupFormSlice.actions;

export default popupFormSlice.reducer;
