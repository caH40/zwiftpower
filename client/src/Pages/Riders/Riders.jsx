import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Riders.module.css';
import { getRiders } from '../../api/riders';
import TableRiders from '../../components/Tables/TableRiders/TableRiders';
import Button from '../../components/UI/Button/Button';
import useTitle from '../../hook/useTitle';
import { getAlert } from '../../redux/features/alertMessageSlice';

const Riders = () => {
	const [riders, setRiders] = useState([]);

	useTitle('Редактирование данных Райдеров');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goBack = () => navigate(-1);
	const getAllRidersXLSM = () =>
		dispatch(getAlert({ message: 'В разработке!', type: 'warning', isOpened: true }));

	useEffect(() => {
		getRiders().then(response => setRiders(response.data.riders));
	}, []);

	return (
		<>
			<h3 className={styles.title}>Зарегистрированные Райдеры</h3>
			<div className={styles.right}>
				<Button getClick={getAllRidersXLSM}>Скачать</Button>
			</div>
			<TableRiders riders={riders} />

			<Button getClick={goBack}>назад</Button>
		</>
	);
};

export default Riders;
