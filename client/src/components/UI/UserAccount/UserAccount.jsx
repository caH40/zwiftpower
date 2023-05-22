import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './UserAccount.module.css';

const UserAccount = ({ isAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatar = isAuth?.user.photoProfile ? isAuth.user.photoProfile : '/images/avatar.svg';
  const getClick = () => {
    if (isAuth.status) {
      navigate('/profile');
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
