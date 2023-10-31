import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ResultsRoute } from './Route/ResultsRoute';
import { AdminRoute } from './Route/AdminRoute.jsx';
import { ProfileRoute } from './Route/ProfileRoute';
import { StatisticsRoute } from './Route/StatisticsRoute';
import { ScheduleRouteRoute } from './Route/ScheduleRoute';
import MainLayer from './components/Layers/MainLayer';
import MainPage from './Pages/Main/MainPage';
import Page404 from './Pages/Page404/Page404';
import Authorization from './Pages/Auth/Authorization';
import Registration from './Pages/Auth/Registration';
import Message from './Pages/Message/Message';
import useFirstAuth from './hook/useFirstAuth';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
import NewPassword from './Pages/Auth/NewPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import RaceSeries from './Pages/RaceSeries/RaceSeries';

import LogsAdmin from './Pages/LogsAdmin/LogsAdmin';

const Catchup = lazy(() => import('./Pages/Catchup/Catchup'));
const Faq = lazy(() => import('./Pages/Faq/Faq'));

import { sendMetrika } from './metrika/yandex';
import MySuspense from './HOC/Se';
import './css/App.css';

function App() {
  useFirstAuth();
  const userAuth = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(userAuth.role);

  const location = useLocation();
  sendMetrika('hit', location.pathname);

  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route index element={<MainPage />} />
        <Route path="/auth/authorization" element={<Authorization />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/confirm-email/:token" element={<ConfirmEmail />} />
        <Route path="/auth/new-password/:token" element={<NewPassword />} />
        <Route path="/message/:messageId/:additional" element={<Message />} />
        <Route path="/race/series" element={<RaceSeries />} />
        <Route
          path="/race/series/catchup"
          element={
            <MySuspense>
              <Catchup />
            </MySuspense>
          }
        />
        <Route path="/logs/admin" element={<LogsAdmin />} />
        <Route
          path="/faq"
          element={
            <MySuspense>
              <Faq />
            </MySuspense>
          }
        />
        {isModerator ? AdminRoute() : ''}
        <Route path="*" element={<Page404 />} />
        {ResultsRoute()}
        {ScheduleRouteRoute()}
        {ProfileRoute()}
        {StatisticsRoute()}
      </Route>
    </Routes>
  );
}

export default App;
