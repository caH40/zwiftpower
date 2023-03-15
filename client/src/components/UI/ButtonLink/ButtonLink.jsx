import React from 'react';
import { Link } from 'react-router-dom';

import cls from './ButtonLink.module.css';

const ButtonLink = ({ children, addCls, to }) => {
	const classes = addCls?.map(elm => cls[elm]).join(' ');
	return (
		<Link to={to} className={`${cls.button} ${classes}`}>
			{children}
		</Link>
	);
};

export default ButtonLink;
