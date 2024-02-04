import { Outlet } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import { useAd } from '../../hook/useAd';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Statistics.module.css';

// рекламные блоки на странице
const adOverFooter = 8;
const adUnderHeader = 14;
const adNumbers = [adUnderHeader, adOverFooter];

function Statistics() {
  const { isScreenLg: isDesktop } = useResize();
  useAd(adNumbers);

  return (
    <>
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}
        <NavBarStatistics addCls={'mb15'} />
        <Outlet />
      </section>
      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}
export default Statistics;
