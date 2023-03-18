import React from 'react';

import ClearTbody from '../ClearTbody/ClearTbody';
import cls from '../Table.module.css';

const TableSeriesNew = ({ series }) => {
	const hasGeneral = series[0].hasGeneral.toString();
	const classGeneral = `${cls.boxValue} ${hasGeneral === 'true' ? cls.success : cls.error}`;
	const hasTeams = series[0].hasTeams.toString();
	const classTeams = `${cls.boxValue} ${hasTeams === 'true' ? cls.success : cls.error}`;
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>Series</caption>
			<thead>
				<tr>
					<th>#</th>
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
						<th scope="row">{1}</th>
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
				<ClearTbody quantityTd={7} />
			)}
		</table>
	);
};

export default TableSeriesNew;
