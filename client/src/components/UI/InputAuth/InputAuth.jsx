import React from 'react';
import { Link } from 'react-router-dom';

import cls from './InputAuth.module.css';

const InputAuth = ({ label, register, input, validationText, link, addCls = ' ' }) => {
	const classBox = addCls
		.split(' ')
		.map(elm => cls[elm])
		.join(' ');

	return (
		<div className={`${cls.box} ${classBox}`}>
			<div className={cls.box__text}>
				{label ? (
					<label className={cls.label} htmlFor={input.id}>
						{label}
					</label>
				) : undefined}

				{validationText ? <span className={cls.wrong}>{validationText}</span> : undefined}

				{link ? (
					<Link className={cls.link} to={link.to}>
						{link.text}
					</Link>
				) : undefined}
			</div>
			<input {...register} {...input} className={cls.input} />
		</div>
	);
};

export default InputAuth;
