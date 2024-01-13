import { Outlet } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';

import styles from './Statistics.module.css';

const adNumber = 8;

function Statistics() {
  useAd(adNumber);
  return (
    <>
      <section className={styles.wrapper}>
        <NavBarStatistics addCls={'mb15'} />
        <Outlet />
      </section>
      <div id={`yandex_rtb_C-A-5165832-${adNumber}`}></div>
    </>
  );
}
export default Statistics;
