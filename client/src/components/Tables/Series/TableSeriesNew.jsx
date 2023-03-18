import React from 'react';

import ClearTbody from '../ClearTbody/ClearTbody';
import cls from '../Table.module.css';

const TableSeriesNew = ({ series }) => {
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>Series</caption>
			<thead>
				<tr>
					<th>#</th>
					<th>Название</th>
					<th>Организатор</th>
					<th>Начало</th>
					<th>Завершилась</th>
					<th>Тип</th>
					<th>Количество этапов</th>
				</tr>
			</thead>
			{series?.length ? (
				<tbody>
					{series.map((seriesOne, index) => {
						const finished = seriesOne.isFinished.toString();
						const classFinished = `${cls.boxValue} ${finished === 'true' ? cls.success : cls.error}`;
						return (
							<tr className={cls.trLink} key={seriesOne._id}>
								<th scope="row">{index + 1}</th>
								<td>{seriesOne.name}</td>
								<td>{seriesOne.organizer}</td>
								<td>{new Date(seriesOne.dateStart).toLocaleDateString()}</td>
								<td>
									<div className={classFinished}>{finished}</div>
								</td>
								<td>{seriesOne.type}</td>
								<td>{seriesOne.quantityStages}</td>
							</tr>
						);
					})}
				</tbody>
			) : (
				<ClearTbody quantityTd={7} />
			)}
		</table>
	);
};

export default TableSeriesNew;
