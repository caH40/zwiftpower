import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getStages } from '../../../api/stages';
import Button from '../../UI/Button/Button';
import cls from '../Table.module.css';

const TableStagesForEdit = ({ seriesId }) => {
	const [stages, setStages] = useState([]);
	const navigate = useNavigate();

	const toLink = (url, needLink) => {
		if (!needLink) return;
		navigate(url);
	};

	useEffect(() => {
		getStages(seriesId).then(data => setStages(data));
	}, [seriesId]);
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>{stages[0]?.seriesId.name}:</caption>
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
					<th scope="col">Редактировать</th>
					<th scope="col">Удалить</th>
				</tr>
			</thead>
			<tbody>
				{stages.map(stage => (
					<tr className={cls.trLinkOff} key={stage._id}>
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
						<td>{stage.hasResults.toString()}</td>
						<td>
							<a href={stage.link} target="_blank" rel="noreferrer">
								Маршрут
							</a>
						</td>
						<td>
							<Button getClick={() => toLink(`stage-edit/${stage._id}`, true)}>редактировать</Button>
						</td>
						<td>
							<Button>удалить</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableStagesForEdit;
