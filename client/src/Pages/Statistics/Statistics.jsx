import { Outlet } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import { useAd } from '../../hook/useAd';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Statistics.module.css';

// рекламные блоки на странице
const adUnderHeader = 14;
const adOverFooter = 8;
const adNumbers = [adOverFooter, adUnderHeader];

function Statistics() {
  const { isScreenLg: isDesktop } = useResize();
  useAd(adNumbers);
  return (
    <>
      <section className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} maxHeight={180} marginBottom={10} />
        ) : null}
        <NavBarStatistics addCls={'mb15'} />
        <Outlet />
      </section>
      <AdContainer number={adOverFooter} maxWidth={1105} />
    </>
  );
}
export default Statistics;
