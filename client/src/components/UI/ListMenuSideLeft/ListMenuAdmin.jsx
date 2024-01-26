import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconEventEdit from '../../icons/IconEventEdit';
import IconEventAdd from '../../icons/IconEventAdd';
import IconEventCreate from '../../icons/IconEventCreate';
import IconUsers from '../../icons/IconUsers';

import styles from './ListMenu.module.css';

function ListMenuAdmin({ state }) {
  const { user } = useSelector((state) => state.checkAuth.value);

  const isAdmin = ['admin'].includes(user.role);
  const isModerator = ['admin', 'moderator'].includes(user.role);

  const activeLink = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;
  return (
    <ul className={styles.list}>
      {isModerator && (
        <>
          <li>
            <NavLink to="/zwift/add/event" className={activeLink}>
              {({ isActive }) => (
                <div className={styles.link__box}>
                  <IconEventCreate isActive={isActive} />
                  <span className={`${styles.link__name} ${styles[state]}`}>
                    Создание заезда в Zwift
                  </span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/zwift/add/event" className={activeLink}>
              {({ isActive }) => (
                <div className={styles.link__box}>
                  <IconEventAdd isActive={isActive} />
                  <span className={`${styles.link__name} ${styles[state]}`}>
                    Добавление заезда из Zwift
                  </span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/zwift/edit/event" className={activeLink}>
              {({ isActive }) => (
                <div className={styles.link__box}>
                  <IconEventEdit isActive={isActive} />
                  <span className={`${styles.link__name} ${styles[state]}`}>
                    Редактирование заезда в Zwift
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        </>
      )}

      {isAdmin && (
        <li>
          <NavLink to="/admin/users" className={activeLink}>
            {({ isActive }) => (
              <div className={styles.link__box}>
                <IconUsers isActive={isActive} />
                <span className={`${styles.link__name} ${styles[state]}`}>
                  Управление пользователями
                </span>
              </div>
            )}
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default ListMenuAdmin;
