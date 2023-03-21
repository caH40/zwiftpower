import React from 'react';
import { Link } from 'react-router-dom';

import cls from './ButtonLink.module.css';

const ButtonLink = ({ children, addCls = '', to }) => {
	const classLink = addCls
		.split(' ')
		.map(elm => cls[elm])
		.join(' ');
	return (
		<Link to={to} className={`${cls.button} ${classLink}`}>
			{children}
		</Link>
	);
};

export default ButtonLink;
