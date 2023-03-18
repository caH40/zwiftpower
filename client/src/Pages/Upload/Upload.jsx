import React, { useState } from 'react';
import { postSchedule } from '../../api/schedule';

import TableSeriesNew from '../../components/Tables/Series/TableSeriesNew';
import TableStagesNew from '../../components/Tables/Stages/TableStagesNew';
import TableFile from '../../components/Tables/TableFile/TableFile';
import Button from '../../components/UI/Button/Button';
import InputFile from '../../components/UI/InputFile/InputFile';
import useTitle from '../../hook/useTitle';
import { uploadSchedule } from '../../service/schedule/schedule';

import cls from './Upload.module.css';

const Upload = () => {
	const [file, setFile] = useState({});

	useTitle('Загрузка расписаний, протоколов этапов');

	const getFile = async event => {
		const schedule = await uploadSchedule(event.target.files[0]);
		setFile(schedule);
	};

	const saveSchedule = () => {
		postSchedule(file);
	};

	return (
		<section className={cls.wrapper}>
			<div className={cls.block}>
				<h2 className={cls.title}>Загрузка расписания серии и этапов</h2>
				<TableFile file={file?.fileAttributes} addCls={'mb10'} />
				{file?.fileAttributes ? (
					<>
						<TableSeriesNew series={file.scheduleSeries} />
						<TableStagesNew stages={file.scheduleStages} />
					</>
				) : (
					''
				)}
				<div className={cls.box__buttons}>
					<InputFile accept={'.xlsx'} getFile={getFile} />
					{file.fileAttributes ? <Button getClick={saveSchedule}>Сохранить</Button> : ''}
				</div>
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
