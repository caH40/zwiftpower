import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { postLogout } from '../../../api/logout';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { getAuth } from '../../../redux/features/authSlice';

import styles from './NavBar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.checkAuth.value);

  const logout = () => {
    postLogout().then(data => {
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
        {status ? (
          <span onClick={logout} className={styles.link}>
						Выход
          </span>
        ) : (
          <NavLink to="/auth/authorization" className={styles.link}>
						Вход
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export default NavBar;
