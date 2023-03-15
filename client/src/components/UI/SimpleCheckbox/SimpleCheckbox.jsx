import React from 'react';

import cls from './SimpleCheckbox.module.css';

const SimpleCheckbox = ({ state, property, setState, title }) => {
	return (
		<label className={cls.label}>
			<span>{title}</span>
			<input
				className={cls.input}
				checked={state[property]}
				type="checkbox"
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.checked }))}
			/>
		</label>
	);
};

export default SimpleCheckbox;
