import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';
import { validatePassword } from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { putNewPassword } from '../../api/new-password';
import { checkRequestPassword } from '../../api/check-request-password';
import { setBackground } from '../../redux/features/backgroundSlice';

import styles from './Auth.module.css';

function NewPassword() {
  const [userId, setUserId] = useState();
  useTitle('Создание нового пароля');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    dispatch(setBackground({ isActive: true, opacity: 1 }));
    return () => dispatch(setBackground({ isActive: false }));
  }, [dispatch]);

  useEffect(() => {
    checkRequestPassword(token).then((response) => {
      setUserId(response.data.userId);
      dispatch(getAlert({ message: response.data.message, type: 'success', isOpened: true }));
    });
  }, [token, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataForm) => {
    putNewPassword(dataForm, userId)
      .then((data) => navigate('/message/newPassword/none'))
      .catch((error) => {
        dispatch(
          getAlert({ message: error.response?.data?.message, type: 'error', isOpened: true })
        );
      });
  };

  return (
    <section className={styles.wrapper}>
      {userId ? (
        <div className={styles.inner}>
          <h1 className={styles.title}>Создание пароля</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputAuth
              label={'Введите новый пароль'}
              register={validatePassword(register)}
              validationText={errors.password ? errors.password.message : ''}
              input={{ id: 'password', autoComplete: 'current-password', type: 'password' }}
              addCls="mb20"
            />

            <Button type={'submit'} addCls={'w_full'}>
              Сохранить
            </Button>
          </form>
          <div className={styles.additional}>
            <Link className={styles.link} to="/auth/authorization">
              Вход на сайт ZP
            </Link>
          </div>
        </div>
      ) : (
        <p className={styles.text}>Ссылка для сброса пароля устарела!</p>
      )}
    </section>
  );
}

export default NewPassword;
