import React from 'react';
import { useDispatch } from 'react-redux';
import { showMenu } from '../../../redux/features/menuBurgerSlice';
import cls from './Hamburger.module.css';

const Hamburger = () => {
	const dispatch = useDispatch();
	const getMenu = () => {
		dispatch(showMenu());
	};
	return (
		<div className={cls.circle} onClick={getMenu}>
			<div className={cls.hamburger__field}>
				<span className={cls.bar}></span>
				<span className={cls.bar}></span>
				<span className={cls.bar}></span>
			</div>
		</div>
	);
};

export default Hamburger;
