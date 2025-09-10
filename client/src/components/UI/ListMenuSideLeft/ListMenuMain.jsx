import { NavLink, useLocation } from 'react-router-dom';

import { sidebarMainMenuItems } from '../../../assets/left-sidebar';

import styles from './ListMenu.module.css';

function ListMenuMain({ state }) {
  const { pathname } = useLocation();

  const activeLink = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  // отслеживания вложенных страниц Статистики
  const isActivePageStatistics = pathname.includes('race/statistics');

  const activeLinkStatistics = isActivePageStatistics
    ? `${styles.link} ${styles.active}`
    : styles.link;

  return (
    <ul className={styles.list}>
      {sidebarMainMenuItems.map((iconItem) => {
        const { icon: Icon, to, label } = iconItem;
        return (
          <li key={iconItem.id}>
            <NavLink
              to={to}
              className={to === '/race/statistics/main' ? activeLinkStatistics : activeLink}
            >
              {({ isActive }) => (
                <div className={styles.link__box}>
                  <Icon
                    isActive={
                      to === '/race/statistics/main' ? isActivePageStatistics : isActive
                    }
                    color="#CECECE"
                  />
                  <span className={`${styles.link__name} ${styles[state]}`}>{label}</span>
                </div>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default ListMenuMain;
