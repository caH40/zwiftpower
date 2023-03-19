import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';

import cls from './Auth.module.css';
import { validatePassword, validateUsername } from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { postAuthorization } from '../../api/authorization';
import { getAuth } from '../../redux/features/authSlice';

const Authorization = () => {
	useTitle('Авторизация');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = dataForm => {
		postAuthorization(dataForm)
			.then(data => {
				dispatch(getAlert({ message: data?.data?.message, type: 'success', isOpened: true }));
				if (data.data.accessToken) {
					localStorage.setItem('accessToken', data.data.accessToken);
					dispatch(getAuth({ status: true, user: data.data.user }));
					dispatch(getAlert({ message: 'Успешная авторизация!', type: 'success', isOpened: true }));
				}
				navigate(-1);
			})
			.catch(error => {
				console.log(error);
				dispatch(
					getAlert({ message: error?.response?.data?.message, type: 'error', isOpened: true })
				);
			});
	};

	return (
		<main className={cls.wrapper}>
			<div className={cls.inner}>
				<h1 className={cls.title}>Вход на сайт ZP</h1>
				<form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
					<InputAuth
						label={'Логин'}
						register={validateUsername(register)}
						validationText={errors.username ? errors.username.message : ''}
						input={{ id: 'username', autoComplete: 'username', type: 'text' }}
					/>
					<InputAuth
						label={'Пароль'}
						link={{ to: '/auth/reset', text: 'Забыли пароль?' }}
						register={validatePassword(register)}
						validationText={errors.password ? errors.password.message : ''}
						input={{ id: 'password', autoComplete: 'current-password', type: 'password' }}
					/>
					<Button type={'submit'} addCls={['w_full']}>
						Вход
					</Button>
				</form>
				<div className={cls.additional}>
					<Link className={cls.link} to="/auth/registration">
						Создание аккаунта
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Authorization;
