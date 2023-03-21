import React from 'react';
import { handlerNewValue, handlerValue } from './service';

import cls from './SimpleInput.module.css';

const SimpleInput = ({
	name,
	state = {},
	setState,
	property,
	type,
	disabled,
	value,
	...props
}) => {
	const currentValue = value ? value : handlerValue(type, state[property]);
	return (
		<>
			{name ? <label className={cls.label}>{name}:</label> : undefined}
			<input
				className={cls.input}
				type={type}
				value={currentValue}
				onChange={e =>
					setState(prev => ({ ...prev, [property]: handlerNewValue(type, e, currentValue) }))
				}
				disabled={disabled}
				{...props}
			/>
		</>
	);
};

export default SimpleInput;
