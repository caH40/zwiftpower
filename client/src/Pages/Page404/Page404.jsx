import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useTitle from '../../hook/useTitle';

import cls from './Page404.module.css';
const urlServer = process.env.REACT_APP_SERVER_FRONT;

const Page404 = () => {
	const { '*': wrongUrl } = useParams();
	useTitle('404');

	return (
		<section className={cls.page404}>
			<h3 className={cls.title}>Ошибка 404</h3>
			<p className={cls.text}>
				Мы не смогли найти страницу{' '}
				<span className={cls.text__wrong}>{`${urlServer}/${wrongUrl}`}</span>
			</p>
			<p className={cls.text}>Не расстраивайтесь, у нас много других интересных страниц!</p>
			<Link to="/" className={cls.text__link}>
				на главную страницу
			</Link>
		</section>
	);
};

export default Page404;
