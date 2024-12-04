import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconZwiftEdit from '../../icons/IconZwiftEdit';

import styles from './ListMenu.module.css';

function ListMenuModeratorClub({ state }) {
  const { user } = useSelector((state) => state.checkAuth.value);

  const isModeratorClub = !!user.moderator?.clubs?.length;

  const isModerator = ['admin', 'moderator'].includes(user.role);

  const activeLink = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;
  return (
    <ul className={styles.list}>
      {(isModerator || isModeratorClub) && (
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
    </ul>
  );
}

export default ListMenuModeratorClub;
