import React from 'react';
import { Link, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import styles from './Page404.module.css';

const urlServer = process.env.REACT_APP_SERVER_FRONT;

function Page404() {
  const { '*': wrongUrl } = useParams();
  useTitle('404');
  useBackground(true, 0.7);

  return (
    <section className={styles.page404}>
      <h3 className={styles.title}>Ошибка 404</h3>
      <p className={styles.text}>
        Мы не смогли найти страницу{' '}
        <span className={styles.text__wrong}>{`${urlServer}/${wrongUrl}`}</span>
      </p>
      <p className={styles.text}>Не расстраивайтесь, у нас много других интересных страниц!</p>
      <Link to="/" className={styles.text__link}>
        на главную страницу
      </Link>
    </section>
  );
}

export default Page404;
