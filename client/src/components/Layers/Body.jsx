import { useLocation } from 'react-router-dom';

import { getAsideEntitiesConfig } from '../../utils/getAsideEntitiesConfig';
import { asideLayoutConfigs } from '../../assets/asideLayoutConfig';
import Background from '../Background/Background';
import NavBarSideLeft from '../UI/NavBarSideLeft/NavBarSideLeft';
import MainAside from '../MainAside/MainAside';

import styles from './Body.module.css';

function Body({ children }) {
  const pathName = useLocation().pathname;

  const asideConfig = getAsideEntitiesConfig(asideLayoutConfigs, pathName);

  return (
    <div className={styles.body}>
      <Background />

      <NavBarSideLeft />

      <div className={styles.container}>
        <main className={styles.main}>{children}</main>

        {asideConfig?.showAside ? (
          <aside className={styles.aside}>
            <MainAside config={asideConfig} />
          </aside>
        ) : null}
      </div>
    </div>
  );
}

export default Body;
