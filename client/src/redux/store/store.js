import { configureStore } from '@reduxjs/toolkit';

import alertMessageSlice from '../features/alertMessageSlice';
import authSlice from '../features/authSlice';
import menuBurgerSlice from '../features/menuBurgerSlice';
import titleSlice from '../features/titleSlice';
import eventParamsSlice from '../features/eventParamsSlice';
import backgroundSlice from '../features/backgroundSlice';
import filterCategorySlice from '../features/filterCategorySlice';
import filterWattsSlice from '../features/filterWattsSlice';
import columnsCPSlice from '../features/columnsCPSlice';

export default configureStore({
  reducer: {
    alertMessage: alertMessageSlice,
    titlePage: titleSlice,
    checkAuth: authSlice,
    menuBurger: menuBurgerSlice,
    eventParams: eventParamsSlice,
    background: backgroundSlice,
    filterCategory: filterCategorySlice,
    filterWatts: filterWattsSlice,
    columnsCP: columnsCPSlice,
  },
});
