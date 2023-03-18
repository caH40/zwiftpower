import React, { useState } from 'react';
import TableSeriesNew from '../../components/Tables/Series/TableSeriesNew';
import TableStagesNew from '../../components/Tables/Stages/TableStagesNew';
import TableFile from '../../components/Tables/TableFile/TableFile';
import InputFile from '../../components/UI/InputFile/InputFile';
import useTitle from '../../hook/useTitle';

import cls from './Upload.module.css';

const Upload = () => {
	const [file, setFile] = useState({});
	useTitle('Загрузка расписаний, протоколов этапов');

	const getFile = e => setFile(e.target.files[0]);
	console.log(file);
	return (
		<section className={cls.wrapper}>
			<div className={cls.block}>
				<h2 className={cls.title}>Загрузить расписание серии</h2>
				<TableFile file={file} addCls={'mb10'} />
				<TableSeriesNew />
				<TableStagesNew />
				<InputFile accept={'.xlsx'} getFile={getFile} />
			</div>
			<div className={cls.block}>
				<h2 className={cls.title}>Загрузить протокол с результатами этапа</h2>
				<InputFile />
			</div>
		</section>
	);
};

export default Upload;
