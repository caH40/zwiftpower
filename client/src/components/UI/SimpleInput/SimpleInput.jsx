import React from 'react';
import { formatDateToString } from '../../../utils/format-date';

import cls from './SimpleInput.module.css';

const SimpleInput = ({ name, state, setState, property, type, disabled }) => {
	return (
		<>
			<label className={cls.label}>{name}:</label>
			<input
				className={cls.input}
				type={type}
				value={type === 'date' ? formatDateToString(state[property]) : state[property]}
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.value }))}
				disabled={disabled}
			/>
		</>
	);
};

export default SimpleInput;
