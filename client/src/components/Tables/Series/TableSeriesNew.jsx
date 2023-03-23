import React from 'react';

import ClearTbody from '../ClearTbody/ClearTbody';
import styles from '../Table.module.css';

const TableSeriesNew = ({ series }) => {
	const hasGeneral = series[0].hasGeneral.toString();
	const classGeneral = `${styles.boxValue} ${
		hasGeneral === 'true' ? styles.success : styles.error
	}`;
	const hasTeams = series[0].hasTeams.toString();
	const classTeams = `${styles.boxValue} ${hasTeams === 'true' ? styles.success : styles.error}`;
	return (
		<table className={`${styles.table} ${styles.table_striped}`}>
			<caption>Series</caption>
			<thead>
				<tr>
					<th>Название</th>
					<th>Организатор</th>
					<th>Начало</th>
					<th>Тип</th>
					<th>Генеральный зачет</th>
					<th>Командный зачет</th>
				</tr>
			</thead>
			{series?.length ? (
				<tbody>
					<tr key={series[0]._id}>
						<td>{series[0].name}</td>
						<td>{series[0].organizer}</td>
						<td>{series[0].dateStart}</td>
						<td>{series[0].type}</td>
						<td>
							<div className={classGeneral}>{hasGeneral}</div>
						</td>
						<td>
							<div className={classTeams}>{hasTeams}</div>
						</td>
					</tr>
				</tbody>
			) : (
				<ClearTbody quantityTd={6} />
			)}
		</table>
	);
};

export default TableSeriesNew;
