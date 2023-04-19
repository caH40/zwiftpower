import React from 'react';

import useBackground from '../../hook/useBackground';
import useTitle from '../../hook/useTitle';

// import styles from './Profile.module.css';

function Profile() {
  useTitle('Профиль пользователя');
  useBackground(true);
  return <h2>В разработке...</h2>;
}
export default Profile;
