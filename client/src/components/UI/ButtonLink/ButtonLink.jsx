import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ButtonLink.module.css';
import { addClasses as cns } from '../../../utils/additional-classes';
import MyTooltip from '../../../HOC/MyTooltip';

const ButtonLink = ({ children, addCls = '', to, toolTip }) => {
	return (
		<MyTooltip toolTip={toolTip}>
			<Link to={to} className={cn(styles.button, cns(addCls, styles))}>
				{children}
			</Link>
		</MyTooltip>
	);
};

export default ButtonLink;
