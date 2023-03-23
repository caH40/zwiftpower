import React from 'react';
import cn from 'classnames';
import { addClasses as cns } from '../../../utils/additional-classes.js';

import styles from './Button.module.css';

const Button = ({ getClick, children, addCls = '', ...props }) => {
	return (
		<button
			className={cn(styles.button, cns(addCls, styles))}
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
