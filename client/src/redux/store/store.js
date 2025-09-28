import { configureStore } from '@reduxjs/toolkit';

import alertMessageSlice from '../features/alertMessageSlice';
import authSlice from '../features/authSlice';
import menuBurgerSlice from '../features/menuBurgerSlice';
import titleSlice from '../features/titleSlice';
import zwiftEventParamsSlice from '../features/api/zwift_event_params/zwiftEventParamsSlice';
import backgroundSlice from '../features/backgroundSlice';
import filterCategorySlice from '../features/filterCategorySlice';
import filterGenderSlice from '../features/filterGenderSlice';
import filterWattsSlice from '../features/filterWattsSlice';
import columnsCPSlice from '../features/columnsCPSlice';
import eventsSlice from '../features/api/eventsSlice';
import resultsUpdateSlice from '../features/api/resultsUpdateSlice';
import changeEventSlice from '../features/api/changeEventSlice';
import eventPreviewSlice from '../features/api/eventPreviewSlice';
import eventResultSlice from '../features/api/eventResultSlice';
import popupTableScheduleSlice from '../features/popupTableScheduleSlice';
import popupTableResultsListSlice from '../features/popupTableResultsListSlice';
import userProfileSlice from '../features/api/userProfileSlice';
import popupInputSlice from '../features/popupInputSlice';
import downloadResultsSlice from '../features/api/downloadResultsSlice';
import popupFormSlice from '../features/popupFormSlice';
import menuOrganizerSeriesSlice from '../features/menuOrganizerSeriesSlice';
// удаление информации о релизе из БД
import popupInfoDevDeleteSlice from '../features/api/popupInfoDevDeleteSlice';
// получение всех релизов из БД
import popupInfoDevGetSlice from '../features/api/popupInfoDevGetSlice';
import popupInfoDevPostSlice from '../features/api/popupInfoDevPostSlice';
import popupInfoDevPutSlice from '../features/api/popupInfoDevPutSlice';
import userPowerCurveSlice from '../features/api/userPowerCurveSlice';
import riderMetricsSlice from '../features/api/riderMetricsSlice';
import sortTableSlice from '../features/sortTableSlice';
import actualSeriesSlice from '../features/api/series-actual/actualSeriesSlice';
import eventPostSlice from '../features/api/event-add/eventPostSlice';
import filterIntervalsForLeaderSlice from '../features/filterIntervalsForLeaderSlice';
import eventCreateSlice from '../features/api/event-create/eventCreateSlice';
import filterRaceResultsPageSlice from '../features/filterRaceResultsPageSlice';
import ridersSlice from '../features/api/riders/ridersSlice';
import userResultsSlice from '../features/api/userResultsSlice';
import audioSlice from '../features/audioSlice';

import { statisticsReducers } from './statistics';
import { userReducers } from './user';
import { adminReducers } from './admin';
import { logsReducers } from './logs';
import { streamsReducers } from './streams';
import { organizerReducers } from './organizer';
import { organizersPublicReducers } from './organizers-public';
import { seriesOrganizerReducers, seriesPublicReducers } from './series';
import { siteServiceReducers } from './site-services';
import { paymentReducers } from './payment';
import { paymentNotificationsReducers } from './payment-notifications';
import { siteServicePriceReducers } from './site-service-price';
import { teamReducers } from './team';
import { teamMemberReducers } from './team-member';
import { documentsReducers } from './documents';

export default configureStore({
  reducer: {
    alertMessage: alertMessageSlice,
    titlePage: titleSlice,
    checkAuth: authSlice,
    menuBurger: menuBurgerSlice,
    eventParams: zwiftEventParamsSlice,
    background: backgroundSlice,
    filterCategory: filterCategorySlice,
    filterGender: filterGenderSlice,
    filterWatts: filterWattsSlice,
    columnsCP: columnsCPSlice,
    fetchEventResult: eventResultSlice,
    fetchEvents: eventsSlice,
    fetchResults: resultsUpdateSlice,
    fetchChangeEvent: changeEventSlice,
    fetchEventPreview: eventPreviewSlice,
    popupTableSchedule: popupTableScheduleSlice,
    popupTableResultsList: popupTableResultsListSlice,
    fetchUserProfile: userProfileSlice,
    fetchUserResults: userResultsSlice,
    fetchUserPowerCurve: userPowerCurveSlice,
    riderMetrics: riderMetricsSlice,
    getPopupInput: popupInputSlice,
    popupForm: popupFormSlice,
    downloadResults: downloadResultsSlice,
    popupInfoDevDelete: popupInfoDevDeleteSlice,
    popupInfoDevGet: popupInfoDevGetSlice,
    popupInfoDevPost: popupInfoDevPostSlice,
    popupInfoDevPut: popupInfoDevPutSlice,
    sortTable: sortTableSlice,
    fetchActualSeries: actualSeriesSlice,
    fetchEventPost: eventPostSlice,
    fetchEventCreate: eventCreateSlice,
    filterIntervalsForLeader: filterIntervalsForLeaderSlice,
    filterRaceResultsPage: filterRaceResultsPageSlice,
    riders: ridersSlice,
    menuOrganizerSeries: menuOrganizerSeriesSlice,
    audio: audioSlice,
    ...statisticsReducers,
    ...userReducers,
    ...adminReducers,
    ...logsReducers,
    ...streamsReducers,
    ...organizerReducers,
    ...organizersPublicReducers,
    ...seriesOrganizerReducers,
    ...seriesPublicReducers,
    ...siteServiceReducers,
    ...paymentReducers,
    ...paymentNotificationsReducers,
    ...siteServicePriceReducers,
    ...teamReducers,
    ...teamMemberReducers,
    ...documentsReducers,
  },
});
