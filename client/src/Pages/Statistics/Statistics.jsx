import { Outlet } from 'react-router-dom';

import useBackground from '../../hook/useBackground';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';

import styles from './Statistics.module.css';

function Statistics() {
  useBackground(false);
  return (
    <section className={styles.wrapper}>
      <NavBarStatistics addCls={'mb15'} />
      <Outlet />
    </section>
  );
}
export default Statistics;
