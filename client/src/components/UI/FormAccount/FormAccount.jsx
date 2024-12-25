import { useDispatch } from 'react-redux';
import { useState } from 'react';

import CommonInput from '../SimpleInput/CommonInput';
import Button from '../Button/Button';
import { putUsername } from '../../../redux/features/api/user-settings/putUsername';
import { checkAuth } from '../../../api/auth-check';
import { getAuth } from '../../../redux/features/authSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './FormAccount.module.css';

function FormAccount({ role, username }) {
  const [name, setName] = useState(username);
  const dispatch = useDispatch();

  // отправка запроса создания Эвента на сервер
  const submit = () => {
    dispatch(putUsername({ username: name })).then((dataUpdatedUsername) => {
      if (dataUpdatedUsername.meta.requestStatus === 'fulfilled') {
        // Запрос обновленных данных профиля и обновление стора на клиенте.
        checkAuth().then((response) => {
          if (!response || response.data.success !== true) {
            return;
          }
          dispatch(getAuth({ status: true, user: response.data.user }));
          localStorage.setItem('accessToken', response.data.accessToken);
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
    <form>
      <CommonInput name={'логин'} state={name} setState={setName} />
      <CommonInput name={'роль на сайте'} state={role} disabled={true} />

      <div className={styles.button__right}>
        <Button getClick={submit} disabled={!name.length}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default FormAccount;
