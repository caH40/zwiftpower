import React from 'react';

import cls from './SimpleCheckbox.module.css';

const SimpleCheckbox = ({ state, property, setState, title, disabled }) => {
	return (
		<label className={cls.label}>
			<span>{title}</span>
			<input
				className={cls.input}
				checked={state[property]}
				type="checkbox"
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.checked }))}
				disabled={disabled}
			/>
		</label>
	);
};

export default SimpleCheckbox;
