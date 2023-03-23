import React from 'react';
import { Link } from 'react-router-dom';

import styles from './InputAuth.module.css';

const InputAuth = ({ label, register, input, validationText, link, addCls = ' ' }) => {
	const classBox = addCls
		.split(' ')
		.map(elm => styles[elm])
		.join(' ');

	return (
		<div className={`${styles.box} ${classBox}`}>
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
