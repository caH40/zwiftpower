import { configureStore } from '@reduxjs/toolkit';

import alertMessageSlice from '../features/alertMessageSlice';
import authSlice from '../features/authSlice';
import menuBurgerSlice from '../features/menuBurgerSlice';
import titleSlice from '../features/titleSlice';

export default configureStore({
  reducer: {
    alertMessage: alertMessageSlice,
    titlePage: titleSlice,
    checkAuth: authSlice,
    menuBurger: menuBurgerSlice,
  },
});
