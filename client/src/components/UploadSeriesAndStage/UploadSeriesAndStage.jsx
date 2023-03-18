import React from 'react';

import { uploadSchedule } from '../../service/schedule/schedule';
import DlFile from '../DescriptionList/DlFile/DlFile';
import TableSeriesNew from '../Tables/Series/TableSeriesNew';
import TableStagesNew from '../Tables/Stages/TableStagesNew';
import Button from '../UI/Button/Button';
import InputFile from '../UI/InputFile/InputFile';
import cls from './UploadSeriesAndStage.module.css';

const UploadSeriesAndStage = ({ file, setFile, saveSchedule }) => {
	const getFile = async event => {
		const schedule = await uploadSchedule(event.target.files[0]);
		setFile(schedule);
	};
	return (
		<>
			{file.fileAttributes ? (
				<>
					<DlFile file={file.fileAttributes} addCls="mbRem" />
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
		</>
	);
};

export default UploadSeriesAndStage;
