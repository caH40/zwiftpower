import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './UserAccount.module.css';

const UserAccount = ({ userAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatar = userAuth?.user.photoProfile
    ? userAuth.user.photoProfile
    : '/images/avatar.svg';

  const getClick = () => {
    if (userAuth.status) {
      navigate('/profile');
    } else {
      dispatch(getAlert({ message: 'Необходима авторизация', type: 'info', isOpened: true }));
    }
  };
  return <img className={styles.img} src={avatar} alt="avatar" onClick={getClick} />;
};

export default UserAccount;
