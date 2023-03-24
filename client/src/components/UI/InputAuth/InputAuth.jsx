import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';

import styles from './InputAuth.module.css';

const InputAuth = ({ label, register, input, validationText, link, addCls = ' ' }) => {
	return (
		<div className={cn(styles.box, cns(addCls, styles))}>
			<div className={styles.box__text}>
				{label ? (
					<label className={styles.label} htmlFor={input.id}>
						{label}
					</label>
				) : undefined}

				{validationText ? <span className={styles.wrong}>{validationText}</span> : undefined}

				{link ? (
					<Link className={styles.link} to={link.to}>
						{link.text}
					</Link>
				) : undefined}
			</div>
			<input {...register} {...input} className={styles.input} />
		</div>
	);
};

export default InputAuth;
