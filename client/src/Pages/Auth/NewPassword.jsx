import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';

import cls from './Auth.module.css';
import { validatePassword } from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { putNewPassword } from '../../api/new-password';
import { checkRequestPassword } from '../../api/check-request-password';

const ResetPassword = () => {
	const [userId, setUserId] = useState();
	useTitle('Создание нового пароля');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { token } = useParams();

	useEffect(() => {
		checkRequestPassword(token).then(response => {
			setUserId(response.data.userId);
			dispatch(getAlert({ message: response.data.message, type: 'success', isOpened: true }));
		});
	}, [token, dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = dataForm => {
		putNewPassword(dataForm, userId)
			.then(data => navigate(`/message/newPassword/none`))
			.catch(error => {
				dispatch(
					getAlert({ message: error.response?.data?.message, type: 'error', isOpened: true })
				);
			});
	};

	return (
		<section className={cls.wrapper}>
			{userId ? (
				<div className={cls.inner}>
					<h1 className={cls.title}>Создание пароля</h1>
					<form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
						<InputAuth
							label={'Введите новый пароль'}
							register={validatePassword(register)}
							validationText={errors.password ? errors.password.message : ''}
							input={{ id: 'password', autoComplete: 'current-password', type: 'password' }}
							addCls="mb20"
						/>

						<Button type={'submit'} addCls={['w_full']}>
							Сохранить
						</Button>
					</form>
					<div className={cls.additional}>
						<Link className={cls.link} to="/auth/authorization">
							Вход на сайт ZP
						</Link>
					</div>
				</div>
			) : (
				<p className={cls.text}>Ссылка для сброса пароля устарела!</p>
			)}
		</section>
	);
};

export default ResetPassword;
