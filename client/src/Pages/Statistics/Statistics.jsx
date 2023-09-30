import { Outlet } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import styles from './Statistics.module.css';

function Statistics() {
  useTitle('Статистика');
  useBackground(false);
  return (
    <section className={styles.wrapper}>
      <Outlet />
    </section>
  );
}
export default Statistics;
