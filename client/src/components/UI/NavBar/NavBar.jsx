import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { postLogout } from '../../../api/logout';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { getAuth } from '../../../redux/features/authSlice';
import UserAccount from '../UserAccount/UserAccount';

import styles from './NavBar.module.css';

function NavBar() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.checkAuth.value);

  const logout = () => {
    postLogout().then((_) => {
      localStorage.removeItem('accessToken');
      dispatch(
        getAuth({
          status: false,
          user: { email: '', id: '', role: '', username: '', photoProfile: '' },
        })
      );
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
        <div className={styles.box__user}>
          <UserAccount userAuth={userAuth} />
        </div>
      </li>
    </ul>
  );
}

export default NavBar;
