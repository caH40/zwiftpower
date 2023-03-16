import React from 'react';

import cls from './SimpleSelect.module.css';

const SimpleSelect = ({ name, state, setState, property, disabled, options }) => {
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
				<option className={cls.option} value=""></option>
				{options.map(element => (
					<option className={cls.option} value={element.name} key={element.id}>
						{element.name}
					</option>
				))}
			</select>
		</>
	);
};

export default SimpleSelect;
