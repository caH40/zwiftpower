import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showMenu } from '../../../redux/features/menuBurgerSlice';
import cls from './PopupMenu.module.css';

const PopupMenu = () => {
	const dispatch = useDispatch();
	const { user, status } = useSelector(state => state.checkAuth.value);

	const isAdmin = ['admin'].includes(user.role);
	const isModerator = ['admin', 'moderator'].includes(user.role);

	return (
		<div className={cls.modal__overlay} onClick={() => dispatch(showMenu())}>
			<div className={cls.popup}>
				<ul className={cls.list}>
					<li className={cls.item}>
						<Link to="/" className={cls.link}>
							Главная
						</Link>
					</li>

					{status ? (
						<li className={cls.item}>
							<Link to="/profile" className={cls.link}>
								Профиль
							</Link>
						</li>
					) : undefined}

					{isModerator ? (
						<>
							<li className={cls.item}>
								<Link to="/edit/stage" className={cls.link}>
									Stages
								</Link>
							</li>
							<li className={cls.item}>
								<Link to="/edit/series" className={cls.link}>
									Series
								</Link>
							</li>
							<li className={cls.item}>
								<Link to="/edit/upload" className={cls.link}>
									Загрузка
								</Link>
							</li>{' '}
						</>
					) : undefined}

					{isAdmin ? (
						<li className={cls.item}>
							<Link to="/edit/users" className={cls.link}>
								Пользователи
							</Link>
						</li>
					) : undefined}
				</ul>
			</div>
		</div>
	);
};

export default PopupMenu;
