import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import { useAd } from '../../hook/useAd';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Statistics.module.css';

// рекламные блоки на странице
const adUnderHeader = 14;
const adNumbers = [adUnderHeader];

function Statistics() {
  const { isScreenLg: isDesktop } = useResize();
  useAd(adNumbers);
  useEffect(() => {
    (window.MRGtag || []).push({});
  }, []);
  return (
    <>
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={150} marginBottom={10} />}
        <NavBarStatistics addCls={'mb15'} />
        <Outlet />
      </section>
      {isDesktop && (
        <ins
          className="mrg-tag"
          style={{ display: 'inline-block', width: 'auto', height: '300px' }}
          data-ad-client="ad-1499271"
          data-ad-slot="1499271"
        ></ins>
      )}
      {!isDesktop && <AdContainer number={adUnderHeader} />}
    </>
  );
}
export default Statistics;
