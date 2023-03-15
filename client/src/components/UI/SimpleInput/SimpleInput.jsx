import React from 'react';

const SimpleInput = ({ name, state, setState, property, type }) => {
	return (
		<>
			<p style={{ paddingBottom: '5px' }}>{name}:</p>
			<input
				className="simpleInput"
				type={type}
				placeholder={name}
				value={state[property]}
				onChange={e => setState(prev => ({ ...prev, [property]: e.target.value }))}
			/>
		</>
	);
};

export default SimpleInput;
