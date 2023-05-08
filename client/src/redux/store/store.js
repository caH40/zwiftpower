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
import eventSlice from '../features/api/eventSlice';
import eventsSlice from '../features/api/eventsSlice';
import resultsSlice from '../features/api/resultsSlice';
import changeEventSlice from '../features/api/changeEventSlice';
import eventPreviewSlice from '../features/api/eventPreviewSlice';

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
    fetchEvent: eventSlice,
    fetchEvents: eventsSlice,
    fetchResults: resultsSlice,
    fetchChangeEvent: changeEventSlice,
    fetchEventPreview: eventPreviewSlice,
  },
});
