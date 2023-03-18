import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { postResults, postSchedule } from '../../api/schedule';
import UploadResults from '../../components/UploadResults/UploadResults';
import UploadSeriesAndStage from '../../components/UploadSeriesAndStage/UploadSeriesAndStage';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';
import cls from './Upload.module.css';

const Upload = () => {
	const [schedule, setSchedule] = useState({});
	const [results, setResults] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useTitle('Загрузка расписаний, протоколов этапов');

	const saveSchedule = () => {
		postSchedule(schedule)
			.then(data => {
				dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
				navigate(`/edit/series/`);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: 'Ошибка при сохранении данных!', type: 'error', isOpened: true })
				)
			);
	};

	const saveResults = () => {
		postResults(results)
			.then(data => {
				dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
				navigate(`/edit/stage/`);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: 'Ошибка при сохранении данных!', type: 'error', isOpened: true })
				)
			);
	};

	return (
		<section className={cls.wrapper}>
			<div className={cls.block}>
				<h2 className={cls.title}>Загрузка расписания серии и этапов</h2>
				<UploadSeriesAndStage
					schedule={schedule}
					setSchedule={setSchedule}
					saveSchedule={saveSchedule}
				/>
			</div>

			<div className={cls.block}>
				<h2 className={cls.title}>Загрузка протокола с результатами этапа</h2>
				<UploadResults results={results} setResults={setResults} saveResults={saveResults} />
			</div>
		</section>
	);
};

export default Upload;
