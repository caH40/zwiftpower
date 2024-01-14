import { Outlet } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import NavBarStatistics from '../../components/UI/NavBarStatistics/NavBarStatistics';
import { adBlocks } from '../../yandex/blocks';

import styles from './Statistics.module.css';

// рекламные блоки на странице
const adNumbers = [8];
const adBlock_8 = adBlocks.find((block) => block.id === 8)?.label;

function Statistics() {
  useAd(adNumbers);
  return (
    <>
      <section className={styles.wrapper}>
        <NavBarStatistics addCls={'mb15'} />
        <Outlet />
      </section>
      <div id={`yandex_rtb_${adBlock_8}`}></div>
    </>
  );
}
export default Statistics;
