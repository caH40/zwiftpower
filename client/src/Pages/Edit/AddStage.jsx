import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import FormEditStage from '../../components/UI/FormEditStage/FormEditStage';
import useTitle from '../../hook/useTitle';
import { isValid, stageClear } from './service';

import styles from './Edit.module.css';
import { postStage } from '../../api/stage';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../redux/features/alertMessageSlice';

const AddStage = () => {
	const { seriesId } = useParams();
	const [stage, setStage] = useState(() => ({ ...stageClear, seriesId }));

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	useTitle('Редактирование данных Series, Stage');

	const sendForm = () => {
		if (!isValid(stage))
			return dispatch(
				getAlert({ message: 'Необходимо заполнить все поля!', type: 'warning', isOpened: true })
			);

		postStage(stage)
			.then(data => {
				dispatch(getAlert({ message: data.data?.message, type: 'success', isOpened: true }));
				navigate(`/edit/series/${seriesId}`);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: 'Ошибка при сохранении данных!', type: 'error', isOpened: true })
				)
			);
	};

	return (
		<section className={styles.block}>
			<h3 className={styles.title}>{`Добавление нового Этапа в Series (${seriesId})`}</h3>
			<FormEditStage stage={stage} setStage={setStage} sendForm={sendForm} />
			<Button getClick={goBack}>назад</Button>
		</section>
	);
};

export default AddStage;
