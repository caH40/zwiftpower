import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { postRegistrationCredential } from '../../api/registration';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { setBackground } from '../../redux/features/backgroundSlice';
import OAuth from '../../components/UI/OAuth/OAuth';
import { useLocationInfo } from '../../hook/useLocationInfo';
import { useDeviceInfo } from '../../hook/useDeviceInfo';
import { getAuth } from '../../redux/features/authSlice';

import styles from './Auth.module.css';

function Registration() {
  useTitle('Регистрация');

  const device = useDeviceInfo();
  const location = useLocationInfo();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setBackground({ isActive: true, opacity: 1 }));
    return () => dispatch(setBackground({ isActive: false }));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    try {
      const { username, email, password } = dataForm;

      const user = postRegistrationCredential({ username, email, password, device, location });

      // Установка состояния аутентификации в браузере.
      dispatch(getAuth({ status: true, user: user.data }));

      // dispatch(getAlert({ message: data?.data?.message, type: 'success', isOpened: true }));
      navigate(`/message/registration/${email}`);
    } catch (error) {
      dispatch(
        getAlert({ message: error?.response?.data?.message, type: 'error', isOpened: true })
      );
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Регистрация на сайте ZP</h2>

        <div className={styles.form}>
          {/* <h3 className={styles.title__menu}>Регистрация через сервисы</h3> */}
          <OAuth isRegistration={true} device={device} location={location} />

          <hr className={styles.line} />

          <form className={styles.credentials} onSubmit={handleSubmit(onSubmit)}>
            <InputAuth
              label={'E-mail'}
              register={validateEmail(register)}
              validationText={errors.email ? errors.email.message : ''}
              input={{ id: 'email', email: 'username', type: 'text' }}
              addCls="mb20"
            />
            <InputAuth
              label={'Логин'}
              register={validateUsername(register)}
              validationText={errors.username ? errors.username.message : ''}
              input={{ id: 'username', autoComplete: 'username', type: 'text' }}
              addCls="mb20"
            />
            <InputAuth
              label={'Пароль'}
              register={validatePassword(register)}
              validationText={errors.password ? errors.password.message : ''}
              input={{ id: 'password', autoComplete: 'current-password', type: 'password' }}
              addCls="mb20"
            />
            <Button type={'submit'} addCls={'w_full'}>
              Зарегистрироваться
            </Button>
          </form>
          {/* 
          <hr className={styles.line} />

          <div className={styles.privacy}>
            Нажимая на кнопки сервисов или «Зарегистрироваться», вы принимаете{' '}
            <Link className={styles.link} to={'/agreement'}>
              пользовательское соглашение
            </Link>{' '}
            и{' '}
            <Link className={styles.link} to={'/privacy'}>
              политику конфиденциальности
            </Link>
          </div> */}
        </div>

        {/* <div className={styles.additional}>
          Нажимая на кнопки сервисов или «Зарегистрироваться», вы принимаете пользовательское
          соглашение и политику конфиденциальности
        </div> */}

        <div className={styles.additional}>
          <Link className={styles.link} to="/auth/authorization">
            Вход на сайт ZP
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Registration;
