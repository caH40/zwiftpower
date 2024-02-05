import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconUsers from '../../icons/IconUsers';
import IconZwiftEdit from '../../icons/IconZwiftEdit';

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
        <li>
          <NavLink to="/zwift" className={activeLink}>
            {({ isActive }) => (
              <div className={styles.link__box}>
                <IconZwiftEdit isActive={isActive} />
                <span className={`${styles.link__name} ${styles[state]}`}>
                  Управление Эвентами в Zwift
                </span>
              </div>
            )}
          </NavLink>
        </li>
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
