import { Outlet } from 'react-router-dom';

import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';

import styles from './Statistics.module.css';

function Statistics() {
  return (
    <section>
      <NavBarStatistics addCls={'mb15'} />
      <Outlet />
    </section>
  );
}
export default Statistics;
