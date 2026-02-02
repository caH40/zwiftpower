import Background from '../Background/Background';
import NavBarSideLeft from '../UI/NavBarSideLeft/NavBarSideLeft';
import MainAside from '../MainAside/MainAside';

import styles from './Body.module.css';

function Body({ children }) {
  return (
    <div className={styles.body}>
      <Background />

      <NavBarSideLeft />

      <div className={styles.container}>
        <main className={styles.main}>{children}</main>

        <aside className={styles.aside}>
          <MainAside />
        </aside>
      </div>
    </div>
  );
}

export default Body;
