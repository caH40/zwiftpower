import React from 'react';

import cls from './Button.module.css';

const Button = ({ getClick, children, addCls = '', ...props }) => {
	const classBtn = addCls
		.split(' ')
		.map(elm => cls[elm])
		.join(' ');

	return (
		<button
			className={`${cls.button} ${classBtn}`}
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
