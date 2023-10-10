import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './UserAccount.module.css';

const UserAccount = ({ userAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const zwiftIdAuth = userAuth.user.zwiftId;

  const avatar = userAuth?.user.photoProfile
    ? userAuth.user.photoProfile
    : '/images/avatar.svg';

  const getClick = () => {
    const url = zwiftIdAuth ? `/profile/${zwiftIdAuth}/results` : '/profile/0/settings';

    if (userAuth.status) {
      navigate(url);
    } else {
      dispatch(getAlert({ message: 'Необходима авторизация', type: 'info', isOpened: true }));
    }
  };
  return (
    <>
      <img className={styles.img} src={avatar} alt="avatar" onClick={getClick} />
    </>
  );
};

export default UserAccount;
