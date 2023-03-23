import React from 'react';
import { useDispatch } from 'react-redux';
import { putMultiplier } from '../../../api/points';

import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './SelectMultiplier.module.css';

const SelectMultiplier = ({ stageId, number, multiplier, pointsType, setUpdate }) => {
	const dispatch = useDispatch();

	const changeMultiplier = e => {
		const newMultiplier = Number(e.target.value);

		putMultiplier(stageId, number, newMultiplier, pointsType)
			.then(data => {
				dispatch(getAlert({ message: data.data.message, type: 'success', isOpened: true }));
			})
			.catch(error =>
				dispatch(
					getAlert({ message: 'Ошибка при коэффициента очков!', type: 'error', isOpened: true })
				)
			)
			.finally(() => setUpdate(prev => !prev));
	};

	return (
		<select
			onChange={changeMultiplier}
			name="multiplier"
			size="1"
			defaultValue={multiplier}
			className={`${styles.select} ${styles[pointsType]}`}
		>
			<option className={`${styles[pointsType]}`} value="0.5" label="x0.5" />
			<option className={`${styles[pointsType]}`} value="1" label="x1" />
			<option className={`${styles[pointsType]}`} value="2" label="x2" />
		</select>
	);
};

export default SelectMultiplier;
