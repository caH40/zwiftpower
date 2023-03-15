import React from 'react';

import cls from './SimpleInput.module.css';

const SimpleInput = ({ name, state, setState, property, type, disabled }) => {
	return (
		<>
			<label className={cls.label}>{name}:</label>
			<input
				className={cls.input}
				type={type}
				placeholder={name}
				value={state[property]}
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.value }))}
				disabled={disabled}
			/>
		</>
	);
};

export default SimpleInput;
