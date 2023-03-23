import React from 'react';

import styles from './SimpleCheckbox.module.css';

const SimpleCheckbox = ({ state, property, setState, title, disabled }) => {
	return (
		<label className={styles.label}>
			<span>{title}</span>
			<input
				className={styles.input}
				checked={state[property]}
				type="checkbox"
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.checked }))}
				disabled={disabled}
			/>
		</label>
	);
};

export default SimpleCheckbox;
