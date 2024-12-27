import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import InputAuth from '../../components/UI/InputAuth/InputAuth';
import useTitle from '../../hook/useTitle';
import { validatePassword, validateUsername } from '../../utils/validatorService';
import Button from '../../components/UI/Button/Button';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { postAuthorization } from '../../api/authorization';
import { getAuth } from '../../redux/features/authSlice';
import { setBackground } from '../../redux/features/backgroundSlice';
import { lsAccessToken } from '../../constants/localstorage';
import OAuth from '../../components/UI/OAuth/OAuth';
import { useDeviceInfo } from '../../hook/useDeviceInfo';
import { useLocationInfo } from '../../hook/useLocationInfo';

import styles from './Auth.module.css';

function Authorization() {
  useTitle('Авторизация');

  // Данные оборудования, браузера, по и места расположения откуда производится работа с сайтом.
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

  // Обработчик отправки формы. Происходит аутентификация пользователя через логин/пароль.
  const onSubmit = async (dataForm) => {
    try {
      const { username, password } = dataForm;
      const {
        message: messageSuccess,
        data: { accessToken, user },
      } = await postAuthorization({ username, password, device, location });

      if (accessToken) {
        // Установка состояния аутентификации в браузере.
        localStorage.setItem(lsAccessToken, accessToken);
        dispatch(getAuth({ status: true, user }));
        dispatch(getAlert({ message: messageSuccess, type: 'success', isOpened: true }));
      }
      navigate(-1);
    } catch (error) {
      dispatch(
        getAlert({ message: error?.response?.data?.message, type: 'error', isOpened: true })
      );
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Вход на сайт ZP</h1>

        <div className={styles.form}>
          <form className={styles.credentials} onSubmit={handleSubmit(onSubmit)}>
            <InputAuth
              label={'Логин'}
              register={validateUsername(register)}
              validationText={errors.username ? errors.username.message : ''}
              input={{ id: 'username', autoComplete: 'username', type: 'text' }}
              addCls="mb20"
            />
            <InputAuth
              label={'Пароль'}
              link={{ to: '/auth/reset', text: 'Забыли пароль?' }}
              register={validatePassword(register)}
              validationText={errors.password ? errors.password.message : ''}
              input={{ id: 'password', autoComplete: 'current-password', type: 'password' }}
              addCls="mb20"
            />
            <Button type={'submit'} addCls={'w_full'}>
              Вход
            </Button>
          </form>

          <hr className={styles.line} />

          {/* Блок авторизации через сторонние сервисы */}
          <h3 className={styles.title__oauth}>Или продолжить через сервисы</h3>
          <OAuth mode="login" device={device} location={location} />
        </div>

        <div className={styles.additional}>
          <Link className={styles.link} to="/auth/registration">
            Регистрация на сайте ZP
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Authorization;
