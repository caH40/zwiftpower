import { Outlet } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Statistics.module.css';

// рекламные блоки на странице
const adOverFooter = 8;
const adNumbers = [adOverFooter];

function Statistics() {
  useAd(adNumbers);
  return (
    <>
      <section className={styles.wrapper}>
        <NavBarStatistics addCls={'mb15'} />
        <Outlet />
      </section>
      <AdContainer number={adOverFooter} />
    </>
  );
}
export default Statistics;
