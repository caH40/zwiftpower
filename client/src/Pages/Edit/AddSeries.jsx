import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';
import { isValidSeries, seriesClear } from './service';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { postSeries } from '../../api/series';
import FormEditSeries from '../../components/UI/FormEditSeries/FormEditSeries';

import styles from './Edit.module.css';

const AddSeries = () => {
	const [series, setSeries] = useState(() => ({ ...seriesClear }));

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	useTitle('Редактирование данных Series');

	const sendForm = () => {
		if (!isValidSeries(series))
			return dispatch(
				getAlert({ message: 'Необходимо заполнить все поля!', type: 'warning', isOpened: true })
			);

		postSeries(series)
			.then(data => {
				dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
				navigate(`/edit/series/`);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: 'Ошибка при сохранении данных!', type: 'error', isOpened: true })
				)
			);
	};

	return (
		<section className={styles.block}>
			<h3 className={styles.title}>{`Добавление новой Series`}</h3>
			<FormEditSeries series={series} setSeries={setSeries} sendForm={sendForm} />
			<Button getClick={goBack}>назад</Button>
		</section>
	);
};

export default AddSeries;
