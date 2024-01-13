// import { useEffect } from 'react';

import Background from '../Background/Background';
import NavBarSideLeft from '../UI/NavBarSideLeft/NavBarSideLeft';
// import { adBlock_4 } from '../../yandex/ad-blocks';

import styles from './Body.module.css';

function Body({ children }) {
  // useEffect(() => {
  //   adBlock_4();
  // }, []);
  return (
    <section className={styles.body}>
      <Background />
      <NavBarSideLeft />
      <div className={styles.container}>
        {children}
        {/* <div className={styles.container__data}>{children}</div> */}
        {/* <div id="yandex_rtb_C-A-5165832-4"></div> */}
        {/* <div className={styles.ad__block}></div> */}
      </div>
    </section>
  );
}

export default Body;
