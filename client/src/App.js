import { Route, Routes } from 'react-router-dom';

import MainLayer from './components/Layers/MainLayer';
import './css/App.css';
import EditSeriesList from './Pages/EditSeriesList';
import Home from './Pages/Home';
import Page404 from './Pages/Page404/Page404';
import EditStageList from './Pages/EditStageList';
import StageResults from './Pages/StageResults';
import EditUsers from './Pages/EditUsers';
import Download from './Pages/Download';
import EditSeriesMain from './Pages/EditSeries/EditSeriesMain';
import EditSeries from './Pages/EditSeries/EditSeries';
import EditStageParams from './Pages/EditStages/EditStageParams';
import Authorization from './Pages/Auth/Authorization';
// import Registration from './Pages/Auth/Registration';
import Message from './Pages/Message/Message';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth } from './redux/features/authSlice';
import { checkAuth } from './api/auth-check';
import AddStage from './Pages/EditSeries/AddStage';
import EditResults from './Pages/EditResults/EditResults';

function App() {
	const dispatch = useDispatch();
	// const userAuth = useSelector(state => state.checkAuth.value.user);

	// const isAdmin = ['admin'].includes(userAuth.role);
	// const isModerator = ['admin', 'moderator'].includes(userAuth.role);

	useEffect(() => {
		checkAuth()
			.then(response => {
				if (!response) return;
				dispatch(getAuth({ status: true, user: response.data.user }));
				localStorage.setItem('accessToken', response.data.accessToken);
			})
			.catch(error => {
				dispatch(getAuth({ status: false, user: {} }));
				localStorage.setItem('accessToken', '');
			});
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<MainLayer />}>
				<Route index element={<Home />} />
				<Route path="/auth/authorization" element={<Authorization />} />
				{/* <Route path="/auth/registration" element={<Registration />} /> */}
				{/* <Route path="/results" element={<Auth />}></Route> */}
				<Route path="/results/stage/:stageId" element={<StageResults />} />
				<Route path="/edit/users" element={<EditUsers />}></Route>
				<Route path="/edit/download" element={<Download />}></Route>
				<Route path="/edit/series" element={<EditSeriesMain />} />
				<Route path="/edit/series/:seriesId" element={<EditSeries />} />
				<Route path="/edit/series/:seriesId/stage-add" element={<AddStage />} />
				<Route path="/edit/series/:seriesId/stage-edit/:stageId" element={<EditStageParams />} />
				<Route path="/edit/stage" element={<EditSeriesList />} />
				<Route path="/edit/stage/:seriesId" element={<EditStageList />} />
				<Route path="/edit/stage/:seriesId/:stageId" element={<EditResults />} />
				<Route path="/message/:messageId/:additional" element={<Message />} />
				<Route path="*" element={<Page404 />} />
			</Route>
		</Routes>
	);
}

export default App;
