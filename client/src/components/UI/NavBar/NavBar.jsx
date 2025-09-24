import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { postLogout } from '../../../api/logout';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { resetAuth } from '../../../redux/features/authSlice';
import { lsAccessToken, lsPrefixDeviceId } from '../../../constants/localstorage';
import UserAccount from '../UserAccount/UserAccount';
import ServiceMessage from '../../ServiceMessage/ServiceMessage';

import styles from './NavBar.module.css';

function NavBar() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.checkAuth.value);

  const logout = () => {
    postLogout().then((_) => {
      localStorage.removeItem(lsAccessToken);
      localStorage.removeItem(lsPrefixDeviceId);

      dispatch(resetAuth());

      dispatch(getAlert({ message: 'Вы вышли из аккаунта!', type: 'warning', isOpened: true }));
    });
  };

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        {userAuth.status ? (
          <span onClick={logout} className={styles.link}>
            Выход
          </span>
        ) : (
          <NavLink to="/auth/authorization" className={styles.link}>
            Вход
          </NavLink>
        )}
      </li>

      <li className={styles.item}>
        <ServiceMessage />
      </li>

      <li className={styles.item}>
        <div className={styles.box__user}>
          <UserAccount userAuth={userAuth} />
        </div>
      </li>
    </ul>
  );
}

export default NavBar;
