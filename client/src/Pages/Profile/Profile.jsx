import React from 'react';
import { Outlet } from 'react-router-dom';

import useBackground from '../../hook/useBackground';
import useTitle from '../../hook/useTitle';
import NavBarProfile from '../../components/UI/NavBarProfile/NavBarProfile';

import styles from './Profile.module.css';

function Profile() {
  useTitle('Профиль пользователя');
  useBackground(false);

  return (
    <>
      <section className={styles.wrapper}>
        <NavBarProfile />
        <Outlet />
      </section>
    </>
  );
}
export default Profile;
