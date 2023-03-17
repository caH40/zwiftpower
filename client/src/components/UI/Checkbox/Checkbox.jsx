import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import cls from './Checkbox.module.css';

const Checkbox = ({ state, apiRequest, setUpdate, resultId, target }) => {
	const [check, setCheck] = useState(() => state);

	const dispatch = useDispatch();

	const changeValue = () => {
		setCheck(prev => !prev);

		apiRequest(!check, resultId)
			.then(data => {
				dispatch(getAlert({ message: data.data.message, type: 'success', isOpened: true }));
				setUpdate(prev => !prev);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: `Ошибка при изменении ${target}!`, type: 'error', isOpened: true })
				)
			);
	};

	return (
		<input
			onChange={changeValue}
			checked={check}
			type="checkbox"
			id={`${target}-${resultId}`}
			className={cls.input}
		/>
	);
};

export default Checkbox;
