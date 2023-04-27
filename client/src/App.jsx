import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayer from './components/Layers/MainLayer';
import Home from './Pages/Home';
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
import RaceListResults from './Pages/RaceListResults/RaceListResults';
import RaceSchedule from './Pages/RaceSchedule/RaceSchedule';
import RaceSeries from './Pages/RaceSeries/RaceSeries';
import RaceStatistics from './Pages/RaceStatistics/RaceStatistics';
import RaceDescription from './Pages/RaceDescription/RaceDescription';

function App() {
  useFirstAuth();
  const userAuth = useSelector((state) => state.checkAuth.value.user);

  // const isAdmin = ['admin'].includes(userAuth.role);
  const isModerator = ['admin', 'moderator'].includes(userAuth.role);

  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route index element={<Home />} />
        <Route path="/auth/authorization" element={<Authorization />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/confirm-email/:token" element={<ConfirmEmail />} />
        <Route path="/auth/new-password/:token" element={<NewPassword />} />
        <Route path="/results/stage/:stageId" element={<StageResults />} />
        <Route path="/message/:messageId/:additional" element={<Message />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/race/results" element={<RaceListResults />} />
        <Route path="/race/schedule" element={<RaceSchedule />} />
        <Route path="/race/schedule/:eventId" element={<RaceDescription />} />
        <Route path="/race/series" element={<RaceSeries />} />
        <Route path="/race/statistics" element={<RaceStatistics />} />
        {isModerator ? AdminRoute() : ''}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
