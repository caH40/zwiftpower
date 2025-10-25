import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import CommonInput from '../SimpleInput/CommonInput';
import { validateUsername } from '../../../utils/validatorService';
import Button from '../Button/Button';
import { putUsername } from '../../../redux/features/api/user-settings/putUsername';
import { checkAuth } from '../../../api/auth-check';
import { getAuth } from '../../../redux/features/authSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { lsAccessToken } from '../../../constants/localstorage';
import InputAuth from '../InputAuth/InputAuth';

import styles from './FormAccount.module.css';

/**
 * Форма для изменения данных аккаунта.
 */
function FormAccount({ role, username }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username }, mode: 'all' });

  // отправка запроса создания Эвента на сервер
  const onSubmit = (dataForm) => {
    dispatch(putUsername({ username: dataForm.username })).then((dataUpdatedUsername) => {
      if (dataUpdatedUsername.meta.requestStatus === 'fulfilled') {
        // Запрос обновленных данных профиля и обновление стора на клиенте.
        checkAuth().then((response) => {
          if (!response || response.data.success !== true) {
            return;
          }

          // Обновление данных пользователя в хранилище.
          dispatch(getAuth({ status: true, user: response.data.user }));

          // Обновление accessToken в локальном хранилище.
          localStorage.setItem(lsAccessToken, response.data.accessToken);
          dispatch(
            getAlert({
              message: dataUpdatedUsername.payload.message,
              type: 'success',
              isOpened: true,
            })
          );
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputAuth
        label={'Логин'}
        register={validateUsername(register)}
        validationText={errors.username?.message || ''}
        input={{ id: 'username', type: 'text' }}
      />

      <div className={styles.button__right}>
        <Button type={'submit'} disabled={Boolean(errors.username)}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default FormAccount;
