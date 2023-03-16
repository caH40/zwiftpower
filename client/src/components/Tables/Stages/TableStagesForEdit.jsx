import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getStages, postDeleteStage } from '../../../api/stage';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import Button from '../../UI/Button/Button';
import ClearTbody from '../ClearTbody/ClearTbody';
import cls from '../Table.module.css';

const TableStagesForEdit = ({ seriesId }) => {
	const [stages, setStages] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toLink = (url, needLink) => {
		if (!needLink) return;
		navigate(url);
	};

	useEffect(() => {
		getStages(seriesId).then(data => {
			setStages(data.data.stages);
		});
	}, [seriesId]);

	const deleteStage = stage => {
		const confirm = window.confirm(`Вы действительно хотите удалить Этап №${stage.number}?`);
		if (!confirm)
			return dispatch(
				getAlert({
					message: `Отмена удаления Этапа №${stage.number}`,
					type: 'warning',
					isOpened: true,
				})
			);
		postDeleteStage(stage._id)
			.then(data => {
				setStages(data.data.stages);
				dispatch(
					getAlert({
						message: data.data.message,
						type: 'success',
						isOpened: true,
					})
				);
			})
			.catch(error =>
				dispatch(
					getAlert({
						message: `Ошибка при удалении этапа!`,
						type: 'error',
						isOpened: true,
					})
				)
			);
	};

	const seriesName = stages?.length ? stages[0]?.seriesId.name : '';
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>{seriesName} </caption>
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
			{stages?.length ? (
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
								<Button getClick={() => toLink(`stage-edit/${stage._id}`, true)} addCls={['td']}>
									редактировать
								</Button>
							</td>
							<td>
								<Button addCls={['danger', 'td']} getClick={() => deleteStage(stage)}>
									удалить
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			) : (
				<ClearTbody quantityTd={14} />
			)}
		</table>
	);
};

export default TableStagesForEdit;
