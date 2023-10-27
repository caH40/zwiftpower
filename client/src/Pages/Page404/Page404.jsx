import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { serverFront } from '../../config/environment';
import { setBackground } from '../../redux/features/backgroundSlice';

import styles from './Page404.module.css';

function Page404() {
  const { '*': wrongUrl } = useParams();
  useTitle('404');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackground({ isActive: true, opacity: 0.7 }));
    return () => dispatch(setBackground({ isActive: false }));
  }, []);

  return (
    <section className={styles.page404}>
      <h3 className={styles.title}>Ошибка 404</h3>
      <p className={styles.text}>
        Мы не смогли найти страницу{' '}
        <span className={styles.text__wrong}>{`${serverFront}/${wrongUrl}`}</span>
      </p>
      <p className={styles.text}>Не расстраивайтесь, у нас много других интересных страниц!</p>
      <Link to="/" className={styles.text__link}>
        на главную страницу
      </Link>
    </section>
  );
}

export default Page404;
