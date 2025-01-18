import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchPostOrganizerAdmin } from '../../../redux/features/api/organizer_admin/fetchOrganizerAdmin';
import { resetUsers } from '../../../redux/features/api/user_zwiftpower/usersZwiftpowerSlice';
import CommonInput from '../SimpleInput/CommonInput';
import Button from '../Button/Button';
import { fetchUsersZwiftpower } from '../../../redux/features/api/user_zwiftpower/fetchUsersZwiftpower';

import styles from './FormOrganizerAdmin.module.css';

const creatorInit = { _id: '', username: '' };

function FormOrganizerAdmin() {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [creator, setCreator] = useState(creatorInit);
  const [userQuery, setUserQuery] = useState('');

  const { users } = useSelector((state) => state.getUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersZwiftpower());
  }, []);

  const getCreator = (userId, username) => {
    setUserQuery(username);
    setCreator({ _id: userId, username });
    dispatch(resetUsers());
  };

  // отправка запроса создания Эвента на сервер
  const submit = () => {
    dispatch(fetchPostOrganizerAdmin({ name, label, creatorId: creator._id }));

    setName('');
    setLabel('');
    setUserQuery('');
    setCreator('');
  };

  return (
    <form>
      <CommonInput name={'название Организатора заездов'} state={name} setState={setName} />
      <CommonInput
        name={'сокращенное название (аббревиатура)'}
        state={label}
        setState={setLabel}
      />
      <CommonInput
        name={'создатель Организатора заездов'}
        state={userQuery}
        setState={setUserQuery}
        placeholder={'поиск по username'}
      />
      {userQuery.length > 2 ? (
        [...users]
          .filter((user) => user.username.toLowerCase().includes(userQuery.toLowerCase()))
          .map((user) => (
            <div
              className={styles.box__user}
              onClick={() => getCreator(user._id, user.username)}
              key={user._id}
            >
              <span className={styles.user}>{user.username}</span>
              <span className={styles.user}>{user.zwiftId || '-'}</span>
            </div>
          ))
      ) : (
        <span>Для поиска необходимо больше 2х символов</span>
      )}

      <div className={styles.button__right}>
        <Button getClick={submit} disabled={!name || !creator._id || !userQuery || !label}>
          Добавить
        </Button>
      </div>
    </form>
  );
}

export default FormOrganizerAdmin;
