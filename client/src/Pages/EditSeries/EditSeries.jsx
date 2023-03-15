import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSeriesOne, postSeries } from '../../api/series';
import TableStagesForEdit from '../../components/Tables/Stages/TableStagesForEdit';
import Button from '../../components/UI/Button/Button';
import FormEditSeries from '../../components/UI/FormEditSeries/FormEditSeries';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

import cls from './Edit.module.css';

const EditSeries = () => {
	const [series, setSeries] = useState({});
	const [update, setUpdate] = useState(false);

	const { seriesId } = useParams();
	useTitle('Редактирование данных Series');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const getClick = () => navigate(-1);

	useEffect(() => {
		getSeriesOne(seriesId).then(data => setSeries(data.data.series));
	}, [seriesId, update]);

	const sendForm = () => {
		postSeries(series).then(data => {
			setUpdate(prev => !prev);
			dispatch(getAlert({ message: data.data?.message, type: data.type, isOpened: true }));
		});
	};

	return (
		<>
			{series?.name ? (
				<>
					<section className={cls.block}>
						<h3 className={cls.title}>Редактирование серии "{series.name}"</h3>
						<FormEditSeries series={series} setSeries={setSeries} sendForm={sendForm} />
						<Button getClick={getClick}>назад</Button>
					</section>

					<section className={cls.block}>
						<TableStagesForEdit seriesId={seriesId} />
						<div className={cls.right}>
							<Button>добавить</Button>
						</div>
						<Button getClick={getClick}>назад</Button>
					</section>
				</>
			) : (
				'...Loading Series'
			)}
		</>
	);
};

export default EditSeries;
