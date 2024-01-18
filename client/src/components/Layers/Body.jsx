import Background from '../Background/Background';
import NavBarSideLeft from '../UI/NavBarSideLeft/NavBarSideLeft';

import styles from './Body.module.css';

function Body({ children }) {
  return (
    <section className={styles.body}>
      <Background />
      <NavBarSideLeft />
      <div className={styles.container}>{children}</div>
    </section>
  );
}

export default Body;
