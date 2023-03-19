import React from 'react';

import { addClasses } from '../../../utils/additional-classes';
import { getStringDate } from '../../../utils/format-date';
import { convertToKBites } from '../../../utils/format-numbers';

import cls from './DlFile.module.css';

const DlFile = ({ file, addCls }) => {
	const dlClass = addClasses(addCls, cls);
	return (
		<dl className={`${cls.dl} ${dlClass}`}>
			<div className={cls.box}>
				<dt className={cls.title}>Имя файла:</dt>
				<dl>{file.name}</dl>
			</div>
			<div className={cls.box}>
				<dt className={cls.title}>Размер:</dt>
				<dl>{convertToKBites(file.size)} кБ</dl>
			</div>
			<div className={cls.box}>
				<dt className={cls.title}>Изменялся:</dt>
				<dl>{getStringDate(file.lastModified)}</dl>
			</div>
		</dl>
	);
};

export default DlFile;
