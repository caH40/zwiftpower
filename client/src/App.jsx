import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { sendMetrika } from './yandex/metrika.js';
import { useUserRole } from './hook/useUserRole.js';
import MainLayer from './components/Layers/MainLayer';
import useFirstAuth from './hook/useFirstAuth';

// Отдельные блоки маршрутов для страниц.
import { ResultsRoute } from './Route/ResultsRoute';
import { AuthRoute } from './Route/Auth.jsx';
import { AdminRoute } from './Route/AdminRoute.jsx';
import { ProfileRoute } from './Route/ProfileRoute';
import { StatisticsRoute } from './Route/StatisticsRoute';
import { ScheduleRouteRoute } from './Route/ScheduleRoute';
import { SeriesRoute } from './Route/Series.jsx';
import { DocumentationRoute } from './Route/Documentation.jsx';
import { OrganizerRoute } from './Route/OrganizerRoute.jsx';
import { ModeratorClubRoute } from './Route/ModeratorClubRoute.jsx';
import { LegalRoute } from './Route/Legal.jsx';
import { OrganizersPublicRoute } from './Route/OrganizersPublic.jsx';
import { TeamsRoute } from './Route/Teams.jsx';
import './css/App.css';

const Page404 = lazy(() => import('./Pages/Page404/Page404'));
const Riders = lazy(() => import('./Pages/Riders/Riders.jsx'));
const MainPage = lazy(() => import('./Pages/Main/MainPage'));
const Message = lazy(() => import('./Pages/Message/Message'));
const Streams = lazy(() => import('./Pages/Streams/Streams'));
const SiteServices = lazy(() => import('./Pages/SiteServices/SiteServices'));
const ForbiddenPage = lazy(() => import('./Pages/Page403Forbidden/Page403Forbidden.jsx'));
import { LoadingPage } from './Pages/LoadingPage/LoadingPage.jsx';

function App() {
  useFirstAuth();
  const { status } = useSelector((state) => state.checkAuth);
  const { hasAuth, isAdmin, isClubModerator, isOrganizer } = useUserRole();
  const user = useSelector((state) => state.checkAuth.value.user);

  const location = useLocation();
  sendMetrika('hit', location.pathname);

  // Пока не получен ответ от сервера авторизации (положительный или отрицательный) отображается загрузка
  if (status === 'loading' || status === 'idle') {
    return <LoadingPage />;
  }

  const navigateTo403 = (path) => (
    <Route path={path} element={<Navigate to="/403" replace />} />
  );

  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route index element={<MainPage />} />
        <Route path="/message/:messageId/:additional" element={<Message />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/site-services" element={<SiteServices />} />
        <Route path="/403" element={<ForbiddenPage />} />
        {isAdmin ? AdminRoute(isAdmin) : navigateTo403('/admin/*')}
        {user.organizer ? OrganizerRoute(user.organizer) : navigateTo403('/organizer/*')}
        {ModeratorClubRoute({ isClubModerator })}
        {ResultsRoute()}
        {ScheduleRouteRoute()}
        {ProfileRoute({ hasAuth, user })}
        {SeriesRoute()}
        {StatisticsRoute()}
        {AuthRoute()}
        {LegalRoute()}
        {OrganizersPublicRoute()}
        {TeamsRoute({ hasAuth, userInTeam: user.team })}
        {DocumentationRoute({ isAdmin, isOrganizer })}
        <Route
          path="*"
          element={<Navigate to="/404" replace state={{ from: location.pathname }} />}
        />
        <Route path="/404" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
