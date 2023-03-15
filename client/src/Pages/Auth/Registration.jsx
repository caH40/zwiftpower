import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';

import cls from './Auth.module.css';
import {
	validateEmail,
	validatePassword,
	validateUsername,
} from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { postRegistration } from '../../api/registration';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../redux/features/alertMessageSlice';

const Registration = () => {
	useTitle('Регистрация');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = dataForm => {
		postRegistration(dataForm)
			.then(data => {
				dispatch(getAlert({ message: data?.data?.message, type: 'success', isOpened: true }));
				navigate(`/message/registration/${dataForm.email}`);
			})
			.catch(error =>
				dispatch(
					getAlert({ message: error?.response?.data?.message, type: 'error', isOpened: true })
				)
			);
	};

	return (
		<main className={cls.wrapper}>
			<div className={cls.inner}>
				<h1 className={cls.title}>Регистрация на сайт ZP</h1>
				<form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
					<InputAuth
						label={'E-mail'}
						register={validateEmail(register)}
						validationText={errors.email ? errors.email.message : ''}
						input={{ id: 'email', email: 'username', type: 'text' }}
					/>
					<InputAuth
						label={'Логин'}
						register={validateUsername(register)}
						validationText={errors.username ? errors.username.message : ''}
						input={{ id: 'username', autoComplete: 'username', type: 'text' }}
					/>
					<InputAuth
						label={'Пароль'}
						register={validatePassword(register)}
						validationText={errors.password ? errors.password.message : ''}
						input={{ id: 'password', autoComplete: 'current-password', type: 'password' }}
					/>
					<Button type={'submit'} addCls={['w_full']}>
						Зарегистрироваться
					</Button>
				</form>
				<div className={cls.additional}>
					<Link className={cls.link} to="/auth/authorization">
						Вход на сайт ZP
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Registration;
