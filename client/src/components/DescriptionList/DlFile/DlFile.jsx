import React from 'react';

import { addClasses } from '../../../utils/additional-classes';
import { getStringDate } from '../../../utils/format-date';
import { convertToKBites } from '../../../utils/format-numbers';

import styles from './DlFile.module.css';

const DlFile = ({ file, addCls }) => {
	const dlClass = addClasses(addCls, styles);
	return (
		<dl className={`${styles.dl} ${dlClass}`}>
			<div className={styles.box}>
				<dt className={styles.title}>Имя файла:</dt>
				<dl>{file.name}</dl>
			</div>
			<div className={styles.box}>
				<dt className={styles.title}>Размер:</dt>
				<dl>{convertToKBites(file.size)} кБ</dl>
			</div>
			<div className={styles.box}>
				<dt className={styles.title}>Изменялся:</dt>
				<dl>{getStringDate(file.lastModified)}</dl>
			</div>
		</dl>
	);
};

export default DlFile;
