import { Route, Routes } from 'react-router-dom';

import MainLayer from './components/Layers/MainLayer';
import './css/App.css';
import EditSeriesList from './Pages/EditSeriesList';
import Home from './Pages/Home';
import Page404 from './Pages/Page404/Page404';
import EditStageList from './Pages/EditStageList';
import StageResults from './Pages/StageResults';
import EditUsers from './Pages/EditUsers';
import EditSeriesMain from './Pages/EditSeries/EditSeriesMain';
import EditSeries from './Pages/EditSeries/EditSeries';
import EditStageParams from './Pages/EditStages/EditStageParams';
import Authorization from './Pages/Auth/Authorization';
import Registration from './Pages/Auth/Registration';
import Message from './Pages/Message/Message';

import AddStage from './Pages/EditSeries/AddStage';
import EditResults from './Pages/EditResults/EditResults';
import AddSeries from './Pages/EditSeries/AddSeries';
import useFirstAuth from './hook/useFirstAuth';
import Upload from './Pages/Upload/Upload';
import Riders from './Pages/Riders/Riders';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
import NewPassword from './Pages/Auth/NewPassword';
import ResetPassword from './Pages/Auth/ResetPassword';

function App() {
	useFirstAuth();
	// const userAuth = useSelector(state => state.checkAuth.value.user);

	// const isAdmin = ['admin'].includes(userAuth.role);
	// const isModerator = ['admin', 'moderator'].includes(userAuth.role);

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
				<Route path="/edit/users" element={<EditUsers />}></Route>
				<Route path="/edit/series" element={<EditSeriesMain />} />
				<Route path="/edit/series/add" element={<AddSeries />} />
				<Route path="/edit/series/:seriesId" element={<EditSeries />} />
				<Route path="/edit/series/:seriesId/stage-add" element={<AddStage />} />
				<Route path="/edit/series/:seriesId/stage-edit/:stageId" element={<EditStageParams />} />
				<Route path="/edit/stage" element={<EditSeriesList />} />
				<Route path="/edit/stage/:seriesId" element={<EditStageList />} />
				<Route path="/edit/stage/:seriesId/:stageId" element={<EditResults />} />
				<Route path="/message/:messageId/:additional" element={<Message />} />
				<Route path="/edit/upload" element={<Upload />} />
				<Route path="/edit/riders" element={<Riders />} />
				<Route path="*" element={<Page404 />} />
			</Route>
		</Routes>
	);
}

export default App;
