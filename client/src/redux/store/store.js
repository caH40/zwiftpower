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
import eventsSlice from '../features/api/eventsSlice';
import resultsUpdateSlice from '../features/api/resultsUpdateSlice';
import changeEventSlice from '../features/api/changeEventSlice';
import eventPreviewSlice from '../features/api/eventPreviewSlice';
import eventResultSlice from '../features/api/eventResultSlice';
import popupTableScheduleSlice from '../features/popupTableScheduleSlice';
import popupTableResultsListSlice from '../features/popupTableResultsListSlice';
import logsAdminsSlice from '../features/api/logsAdminsSlice';
import userResultsSlice from '../features/api/userResultsSlice';
import popupInputSlice from '../features/popupInputSlice';
import downloadResultsSlice from '../features/api/downloadResultsSlice';
import seriesSlice from '../features/api/seriesSlice';
import resultsSeriesSlice from '../features/api/resultsSeriesSlice';

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
    fetchEventResult: eventResultSlice,
    fetchEvents: eventsSlice,
    fetchResults: resultsUpdateSlice,
    fetchChangeEvent: changeEventSlice,
    fetchEventPreview: eventPreviewSlice,
    popupTableSchedule: popupTableScheduleSlice,
    popupTableResultsList: popupTableResultsListSlice,
    logsAdmins: logsAdminsSlice,
    fetchUserResults: userResultsSlice,
    getPopupInput: popupInputSlice,
    downloadResults: downloadResultsSlice,
    fetchSeries: seriesSlice,
    fetchResultsSeries: resultsSeriesSlice,
  },
});
