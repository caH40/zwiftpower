import React from 'react';

import cls from './Button.module.css';

const Button = ({ getClick, children, addCls, ...props }) => {
	const classes = addCls?.map(elm => cls[elm]).join(' ');
	return (
		<button
			className={`${cls.button} ${classes}`}
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
