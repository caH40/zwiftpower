import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import cls from './Checkbox.module.css';

const Checkbox = props => {
	const [check, setCheck] = useState(() => props.state);

	const dispatch = useDispatch();

	const viewValue = () => {
		setCheck(prev => !prev);
		props.apiRequest(!check, props.resultId).then(data => {
			props.setUpdate(prev => !prev);
			dispatch(getAlert({ message: data.message, type: data.type, isOpened: true }));
		});
	};

	return (
		<input
			onChange={viewValue}
			checked={check}
			type="checkbox"
			id={`${props.target}-${props.resultId}`}
			className={cls.input}
		/>
	);
};

export default Checkbox;
