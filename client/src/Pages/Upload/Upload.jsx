import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { postSchedule } from '../../api/schedule';
import InputFile from '../../components/UI/InputFile/InputFile';
import UploadSeriesAndStage from '../../components/UploadSeriesAndStage/UploadSeriesAndStage';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';
import cls from './Upload.module.css';

const Upload = () => {
	const [file, setFile] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useTitle('Загрузка расписаний, протоколов этапов');

	const saveSchedule = () => {
		postSchedule(file)
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

	return (
		<section className={cls.wrapper}>
			<div className={cls.block}>
				<h2 className={cls.title}>Загрузка расписания серии и этапов</h2>
				<UploadSeriesAndStage file={file} setFile={setFile} saveSchedule={saveSchedule} />
			</div>

			<div className={cls.block}>
				<h2 className={cls.title}>Загрузить протокол с результатами этапа</h2>
				<InputFile />
			</div>
		</section>
	);
};

export default Upload;

// const getFile = event => {
//   const fileNew = event.target.files[0];
//   const { name, size, lastModified } = fileNew;

//   const reader = new FileReader();
//   reader.readAsText(fileNew);
//   reader.onload = e => {
//     const result = e.target.result;
//     const resultJson = JSON.parse(result);
//     const protocolParsed = protocolPrep(resultJson);
//     setFile({
//       protocol: protocolParsed,
//       fileAttributes: { name, size, lastModified },
//     });
//   };
// };
