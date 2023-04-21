import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconRepair from '../../icons/IconRepair';
import IconAddEvent from '../../icons/IconAddEvent';
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
            <NavLink to="/zwift/edit/event" className={activeLink}>
              {({ isActive }) => (
                <div className={styles.link__box}>
                  <IconRepair isActive={isActive} />
                  <span className={`${styles.link__name} ${styles[state]}`}>
                    Редактирование заезда (Zwift)
                  </span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/zwift/add/event" className={activeLink}>
              {({ isActive }) => (
                <div className={styles.link__box}>
                  <IconAddEvent isActive={isActive} />
                  <span className={`${styles.link__name} ${styles[state]}`}>
                    Добавление заезда (Zwift)
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
