import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { setBackground } from '../../redux/features/backgroundSlice';

import styles from './403Forbidden.module.css';

const ForbiddenPage = ({ message = 'Доступ запрещен', showHomeButton = true }) => {
  useTitle('Forbidden 403');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBackground({ isActive: true, opacity: 0.7 }));
    return () => dispatch(setBackground({ isActive: false }));
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>403</div>
        <h1 className={styles.title}>Запрещено</h1>
        <p className={styles.message}>{message}</p>

        {showHomeButton && (
          <Link to={'/'} className={styles.homeButton} onClick={handleGoHome}>
            Вернуться на главную
          </Link>
        )}

        <div className={styles.decorativeElements}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
