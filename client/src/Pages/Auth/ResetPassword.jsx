import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';

import styles from './Auth.module.css';
import { validateEmail } from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { resetPassword } from '../../api/reset-password';

const ResetPassword = () => {
	useTitle('Сброс пароля');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = dataForm => {
		resetPassword(dataForm)
			.then(data => navigate(`/message/resetPassword/${dataForm.email}`))
			.catch(error => {
				console.log(error);
				dispatch(
					getAlert({ message: error.response?.data?.message, type: 'error', isOpened: true })
				);
			});
	};

	return (
		<main className={styles.wrapper}>
			<div className={styles.inner}>
				<h1 className={styles.title}>Сброс пароля</h1>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<InputAuth
						label={'Введите свой e-mail'}
						register={validateEmail(register)}
						validationText={errors.email ? errors.email.message : ''}
						input={{ id: 'email', email: 'username', type: 'text' }}
						addCls="mb20"
					/>

					<Button type={'submit'} addCls={'w_full'}>
						Сброс
					</Button>
				</form>
				<div className={styles.additional}>
					<Link className={styles.link} to="/auth/authorization">
						Вход на сайт ZP
					</Link>
				</div>
			</div>
		</main>
	);
};

export default ResetPassword;
