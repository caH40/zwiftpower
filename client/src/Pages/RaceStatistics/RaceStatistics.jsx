import { Outlet } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import styles from './RaceStatistics.module.css';

function RaceStatistics() {
  useTitle('Статистика');
  useBackground(false);
  return (
    <section className={styles.wrapper}>
      <Outlet />
    </section>
  );
}
export default RaceStatistics;
