import React from 'react';
import { Link, useParams } from 'react-router-dom';

import t from '../../locales/ru.json';

import cls from './Message.module.css';

const Message = () => {
	const { messageId, additional } = useParams();
	const message = t.message[messageId];

	return (
		<main className={cls.wrapper}>
			{message ? (
				<div className={cls.inner}>
					<h1 className={cls.title}>{message.title}</h1>
					<p className={cls.text}>{`${message.text_1}${additional}${message.text_2}`}</p>
					<Link className={cls.link} to={message.link}>
						{message.linkText}
					</Link>
				</div>
			) : (
				''
			)}
		</main>
	);
};

export default Message;
