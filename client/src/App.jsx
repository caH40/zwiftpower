import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useFirstAuth from './hook/useFirstAuth';
import { ResultsRoute } from './Route/ResultsRoute';
import { AuthRoute } from './Route/Auth.jsx';
import { AdminRoute } from './Route/AdminRoute.jsx';
import { ProfileRoute } from './Route/ProfileRoute';
import { StatisticsRoute } from './Route/StatisticsRoute';
import { ScheduleRouteRoute } from './Route/ScheduleRoute';
import { SeriesRoute } from './Route/Series.jsx';
import MainLayer from './components/Layers/MainLayer';

const Page404 = lazy(() => import('./Pages/Page404/Page404'));
const Faq = lazy(() => import('./Pages/Faq/Faq'));
const Riders = lazy(() => import('./Pages/Riders/Riders.jsx'));
const MainPage = lazy(() => import('./Pages/Main/MainPage'));
const Message = lazy(() => import('./Pages/Message/Message'));
const Streams = lazy(() => import('./Pages/Streams/Streams'));

import { sendMetrika } from './yandex/metrika.js';

import './css/App.css';
import { OrganizerRoute } from './Route/OrganizerRoute.jsx';
import { ModeratorClubRoute } from './Route/ModeratorClubRoute.jsx';
import { LegalRoute } from './Route/Legal.jsx';
import { OrganizersPublicRoute } from './Route/OrganizersPublic.jsx';

function App() {
  useFirstAuth();
  const userAuth = useSelector((state) => state.checkAuth.value.user);

  const isModeratorClub = !!userAuth.moderator?.clubs?.length;
  const isModerator = ['admin', 'moderator'].includes(userAuth.role);
  const isAdmin = ['admin'].includes(userAuth.role);

  const location = useLocation();
  sendMetrika('hit', location.pathname);

  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route index element={<MainPage />} />
        <Route path="/message/:messageId/:additional" element={<Message />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/streams" element={<Streams />} />

        {isModerator ? AdminRoute(isAdmin) : ''}
        {isModeratorClub || isModerator ? ModeratorClubRoute() : ''}
        {userAuth.organizer ? OrganizerRoute(userAuth.organizer) : ''}
        <Route path="*" element={<Page404 />} />

        {ResultsRoute()}
        {ScheduleRouteRoute()}
        {ProfileRoute()}
        {SeriesRoute()}
        {StatisticsRoute()}
        {AuthRoute()}
        {LegalRoute()}
        {OrganizersPublicRoute()}
      </Route>
    </Routes>
  );
}

export default App;
