import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import NavBarProfile from '../../components/UI/NavBarProfile/NavBarProfile';

import styles from './Profile.module.css';

function Profile() {
  useTitle('Профиль пользователя');

  const { zwiftId } = useParams();

  return (
    <>
      <section className={styles.wrapper}>
        <NavBarProfile zwiftId={+zwiftId} addCls={'mb15'} />
        <Outlet />
      </section>
    </>
  );
}
export default Profile;
