import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconOrganizer from '../../icons/IconOrganizer';
import IconZwiftEdit from '../../icons/IconZwiftEdit';
import IconAdmin2 from '../../icons/IconAdmin2';

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
                <span className={`${styles.link__name} ${styles[state]}`}>Zwift</span>
              </div>
            )}
          </NavLink>
        </li>
      )}

      {user.organizer && (
        <li>
          <NavLink to="/organizer" className={activeLink}>
            {({ isActive }) => (
              <div className={styles.link__box}>
                <IconOrganizer isActive={isActive} color={'#CECECE'} />
                <span className={`${styles.link__name} ${styles[state]}`}>Организатор</span>
              </div>
            )}
          </NavLink>
        </li>
      )}

      {isAdmin && (
        <li>
          <NavLink to="/admin" className={activeLink}>
            {({ isActive }) => (
              <div className={styles.link__box}>
                <IconAdmin2 isActive={isActive} />
                <span className={`${styles.link__name} ${styles[state]}`}>Админ</span>
              </div>
            )}
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default ListMenuAdmin;
