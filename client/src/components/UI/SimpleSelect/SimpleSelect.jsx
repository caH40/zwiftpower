import React from 'react';

import cls from './SimpleSelect.module.css';

const SimpleSelect = ({ name, state, setState, property, disabled }) => {
	console.log(state[property]);
	return (
		<>
			<p className={cls.label}>{name}:</p>
			<select
				className={cls.select}
				placeholder={name}
				value={state[property]}
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.value }))}
				disabled={disabled}
			>
				<option className={cls.option} value="mixed">
					mixed
				</option>
				<option className={cls.option} value="TT">
					TT
				</option>
				<option className={cls.option} value="mountain">
					mountain
				</option>
			</select>
		</>
	);
};

export default SimpleSelect;
