import { useState } from 'react';
import { useSelector } from 'react-redux';

import IconAdd from '../../icons/IconAdd';
import CommonInput from '../SimpleInput/CommonInput';

import styles from './FindUser.module.css';

/**
 * Блок поиска пользователя для добавления в клуб
 */
function FindUser({ clubCurrent, setClubCurrent, setShowAddModerator }) {
  const { users } = useSelector((state) => state.getUsers);
  // поиск пользователя по userQuery
  const [userQuery, setUserQuery] = useState('');

  // отправка на сервер данных о добавлении модератора в клуб
  const addCurrentModerator = (userId, clubId) => {
    // сброс состояний
    setClubCurrent({ id: '', name: '' });
    setShowAddModerator(false);
    setUserQuery('');
    console.log({ userId, clubId });
  };

  return (
    <>
      <h2 className={styles.title}>{`Добавление модератора для клуба ${clubCurrent.name}`}</h2>
      <div className={styles.group}>
        <CommonInput
          state={userQuery}
          setState={setUserQuery}
          placeholder={'поиск по username'}
        />
        {userQuery.length > 2 ? (
          [...users]
            .filter((user) => user.username.toLowerCase().includes(userQuery.toLowerCase()))
            .map((user) => (
              <div className={styles.box__user} key={user._id}>
                <span className={styles.user}>{user.username}</span>
                <span className={styles.user}>{user.zwiftId || '-'}</span>
                <IconAdd
                  getClick={() => addCurrentModerator(user._id, clubCurrent.id)}
                  squareSize={18}
                />
              </div>
            ))
        ) : (
          <span>Для поиска необходимо больше 2х символов</span>
        )}
      </div>
    </>
  );
}

export default FindUser;
