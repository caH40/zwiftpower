// открытие и закрытие попап меню, пост запрос (добавление информации о релизе)
import { createSlice } from '@reduxjs/toolkit';

const popupFormSlice = createSlice({
  name: 'popupForm',
  initialState: {
    isVisible: false,
    error: null,
    status: null,
    response: {},
    informationDev: [],
    releaseData: { releaseDate: Date.now(), text: '', version: '' },
  },
  reducers: {
    openPopupForm(state, action) {
      state.isVisible = true;
      state.releaseData = action.payload.releaseData;
    },
    closePopupForm(state) {
      state.isVisible = false;
    },
    setPopupForm(state, action) {
      state.releaseData = action.payload.releaseData;
    },
  },
});

export const { openPopupForm, closePopupForm, setPopupForm } = popupFormSlice.actions;

export default popupFormSlice.reducer;
