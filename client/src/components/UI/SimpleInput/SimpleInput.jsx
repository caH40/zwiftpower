import React, { useState } from 'react';
import { handlerNewValue, handlerValue } from './service';

import cls from './SimpleInput.module.css';

const SimpleInput = ({ name, state, setState, property, type, disabled }) => {
	return (
		<>
			<label className={cls.label}>{name}:</label>
			<input
				className={cls.input}
				type={type}
				value={handlerValue(type, state[property])}
				onChange={e => setState(prev => ({ ...prev, [property]: handlerNewValue(e) }))}
				disabled={disabled}
			/>
		</>
	);
};

export default SimpleInput;
