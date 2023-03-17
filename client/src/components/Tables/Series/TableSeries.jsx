import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSeries } from '../../../api/series';
import ClearTbody from '../ClearTbody/ClearTbody';
import cls from '../Table.module.css';

const TableSeries = ({ target }) => {
	const [series, setSeries] = useState([]);
	const navigate = useNavigate();

	const myLink = url => {
		navigate(`/edit/${target}/${url}`);
	};

	useEffect(() => {
		getSeries().then(data => setSeries(data.data.series));
	}, []);
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>Series</caption>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Название</th>
					<th scope="col">Организатор</th>
					<th scope="col">Начало</th>
					<th scope="col">Завершилась</th>
					<th scope="col">Тип</th>
				</tr>
			</thead>
			{series?.length ? (
				<tbody>
					{series.map((seriesOne, index) => {
						const finished = seriesOne.isFinished.toString();
						const classFinished = `${cls.boxValue} ${finished === 'true' ? cls.success : cls.error}`;
						return (
							<tr className={cls.trLink} key={seriesOne._id} onClick={() => myLink(seriesOne._id)}>
								<th scope="row">{index + 1}</th>
								<td>{seriesOne.name}</td>
								<td>{seriesOne.organizer}</td>
								<td>{new Date(seriesOne.dateStart).toLocaleDateString()}</td>
								<td>
									<div className={classFinished}>{finished}</div>
								</td>
								<td>{seriesOne.type}</td>
							</tr>
						);
					})}
				</tbody>
			) : (
				<ClearTbody quantityTd={6} />
			)}
		</table>
	);
};

export default TableSeries;
