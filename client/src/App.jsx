import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayer from './components/Layers/MainLayer';
import MainPage from './Pages/Main/MainPage';
import Page404 from './Pages/Page404/Page404';
import StageResults from './Pages/StageResults';
import Authorization from './Pages/Auth/Authorization';
import Registration from './Pages/Auth/Registration';
import Message from './Pages/Message/Message';
import useFirstAuth from './hook/useFirstAuth';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
import NewPassword from './Pages/Auth/NewPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import Profile from './Pages/Profile/Profile';
import { AdminRoute } from './Route/AdminRoute';
import './css/App.css';
import RaceResultsList from './Pages/RaceResultsList/RaceResultsList';
import RaceScheduleList from './Pages/RaceScheduleList/RaceScheduleList';
import RaceSeries from './Pages/RaceSeries/RaceSeries';
import RaceStatistics from './Pages/RaceStatistics/RaceStatistics';
import RaceScheduleDescription from './Pages/RaceScheduleDescription/RaceScheduleDescription';
import RaceResultsDescription from './Pages/RaceResultsDescription/RaceResultsDescription';
import Faq from './Pages/Faq/Faq';
import LogsAdmin from './Pages/LogsAdmin/LogsAdmin';
import ProfileResults from './Pages/Profile/ProfileResults';
import ProfileSetting from './Pages/Profile/ProfileSetting';
import ProfilePower from './Pages/Profile/ProfilePower';
import ProfileWeight from './Pages/Profile/ProfileWeight';
import { sendMetrika } from './metrika/yandex';
import Catchup from './Pages/Catchup/Catchup';

function App() {
  useFirstAuth();
  const userAuth = useSelector((state) => state.checkAuth.value.user);

  // const isAdmin = ['admin'].includes(userAuth.role);
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
        <Route path="/results/stage/:stageId" element={<StageResults />} />
        <Route path="/message/:messageId/:additional" element={<Message />} />
        <Route path="/profile/:zwiftId" element={<Profile />}>
          <Route path="results" element={<ProfileResults />} />
          <Route path="power" element={<ProfileWeight />} />
          <Route path="weight" element={<ProfilePower />} />
          <Route path="settings" element={<ProfileSetting />} />
        </Route>
        <Route path="/race/results" element={<RaceResultsList />} />
        <Route path="/race/results/:eventId" element={<RaceResultsDescription />} />
        <Route path="/race/schedule" element={<RaceScheduleList />} />
        <Route path="/race/schedule/:eventId" element={<RaceScheduleDescription />} />
        <Route path="/race/series" element={<RaceSeries />} />
        <Route path="/race/series/catchup" element={<Catchup />} />
        <Route path="/race/statistics" element={<RaceStatistics />} />
        <Route path="/logs/admin" element={<LogsAdmin />} />
        <Route path="/faq" element={<Faq />} />
        {isModerator ? AdminRoute() : ''}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
