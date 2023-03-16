import React from 'react';
import { handlerNewValue, handlerValue } from './service';

import cls from './SimpleInput.module.css';

const SimpleInput = ({ name, state, setState, property, type, disabled, ...props }) => {
	return (
		<>
			<label className={cls.label}>{name}:</label>
			<input
				className={cls.input}
				type={type}
				value={handlerValue(type, state[property])}
				onChange={e => setState(prev => ({ ...prev, [property]: handlerNewValue(type, e) }))}
				disabled={disabled}
				{...props}
			/>
		</>
	);
};

export default SimpleInput;
