import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ButtonLink.module.css';

const ButtonLink = ({ children, addCls = '', to }) => {
	const classLink = addCls
		.split(' ')
		.map(elm => styles[elm])
		.join(' ');
	return (
		<Link to={to} className={`${styles.button} ${classLink}`}>
			{children}
		</Link>
	);
};

export default ButtonLink;
