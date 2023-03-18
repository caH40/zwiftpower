import React from 'react';
import { addClasses } from '../../../utils/additional-classes';

import { getStringDate } from '../../../utils/format-date';
import { convertToKBites } from '../../../utils/format-numbers';
import cls from '../Table.module.css';

const TableFile = ({ file = {}, addCls = '' }) => {
	const tableClass = addClasses(addCls, cls);

	return (
		<>
			{file.name ? (
				<table className={tableClass}>
					<tbody>
						<tr>
							<td className={cls.titleTd}>Имя файла:</td>
							<td>{file.name}</td>
						</tr>
						<tr>
							<td className={cls.titleTd}>Размер:</td>
							<td>{convertToKBites(file.size)} кБ</td>
						</tr>
						<tr>
							<td className={cls.titleTd}>Изменялся:</td>
							<td>{getStringDate(file.lastModified)}</td>
						</tr>
					</tbody>
				</table>
			) : (
				''
			)}
		</>
	);
};

export default TableFile;
