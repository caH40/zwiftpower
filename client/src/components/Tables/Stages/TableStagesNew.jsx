import React from 'react';
import ClearTbody from '../ClearTbody/ClearTbody';

import cls from '../Table.module.css';

const TableStagesNew = ({ stages = [] }) => {
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>{}:</caption>
			<thead>
				<tr>
					<th scope="col">Этап</th>
					<th scope="col">Начало</th>
					<th scope="col">Маршрут</th>
					<th scope="col">Мир</th>
					<th scope="col">Тип</th>
					<th scope="col">Круг</th>
					<th scope="col">Дистанция,км</th>
					<th scope="col">Набор,м</th>
					<th scope="col">Спринт</th>
					<th scope="col">Гора</th>
					<th scope="col">Результат</th>
					<th scope="col">ZInsider</th>
				</tr>
			</thead>
			{stages.length ? (
				<tbody>
					{stages.map(stage => {
						const hasResult = stage.hasResults.toString();
						const classResult = `${cls.boxValue} ${hasResult === 'true' ? cls.success : cls.error}`;
						return (
							<tr key={stage._id}>
								<th scope="row">{stage.number}</th>
								<td>{new Date(stage.dateStart).toLocaleDateString()}</td>
								<td>{stage.route}</td>
								<td>{stage.world}</td>
								<td>{stage.type}</td>
								<td>{stage.laps}</td>
								<td>{stage.distance}</td>
								<td>{stage.ascent}</td>
								<td>{stage.quantitySprints}</td>
								<td>{stage.quantityMountains}</td>
								<td>
									<div className={classResult}>{hasResult}</div>
								</td>
								<td>
									<a href={stage.link} target="_blank" rel="noreferrer">
										Маршрут
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			) : (
				<ClearTbody quantityTd={12} />
			)}
		</table>
	);
};

export default TableStagesNew;
