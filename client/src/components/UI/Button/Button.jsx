import React from 'react';

import styles from './Button.module.css';

const Button = ({ getClick, children, addCls = '', ...props }) => {
	const classBtn = addCls
		.split(' ')
		.map(elm => styles[elm])
		.join(' ');

	return (
		<button
			className={`${styles.button} ${classBtn}`}
			onClick={
				getClick
					? e => {
							e.preventDefault();
							getClick();
					  }
					: undefined
			}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
