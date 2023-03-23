import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ButtonLink.module.css';
import { addClasses as cns } from '../../../utils/additional-classes';

const ButtonLink = ({ children, addCls = '', to }) => {
	return (
		<Link to={to} className={cn(styles.button, cns(addCls, styles))}>
			{children}
		</Link>
	);
};

export default ButtonLink;
