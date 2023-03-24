import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getSeriesOne, putSeries } from '../../api/series';
import TableStagesForEdit from '../../components/Tables/Stages/TableStagesForEdit';
import Button from '../../components/UI/Button/Button';
import ButtonLink from '../../components/UI/ButtonLink/ButtonLink';
import FormEditSeries from '../../components/UI/FormEditSeries/FormEditSeries';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './Edit.module.css';

const EditSeries = () => {
	const [series, setSeries] = useState({});
	const [update, setUpdate] = useState(false);

	const { seriesId } = useParams();
	useTitle('Редактирование данных Series, Stage');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const getClick = () => navigate(-1);

	useEffect(() => {
		getSeriesOne(seriesId).then(data => setSeries(data.data.series));
	}, [seriesId, update]);

	const sendForm = () => {
		putSeries(series).then(data => {
			setUpdate(prev => !prev);
			dispatch(getAlert({ message: data.data?.message, type: data.type, isOpened: true }));
		});
	};

	return (
		<>
			{series?.name ? (
				<>
					<section className={styles.block}>
						<h3 className={styles.title}>Редактирование серии "{series.name}"</h3>
						<FormEditSeries series={series} setSeries={setSeries} sendForm={sendForm} />
						<Button getClick={getClick}>назад</Button>
					</section>

					<section className={styles.block}>
						<TableStagesForEdit seriesId={seriesId} />
						<div className={styles.right}>
							<ButtonLink to="stage-add">Добавить</ButtonLink>
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
