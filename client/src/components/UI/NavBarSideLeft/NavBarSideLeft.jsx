import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

import IconCup from '../../icons/IconCup';
import IconWorld from '../../icons/IconWorld';
import IconResults from '../../icons/IconResults';
import IconSchedule from '../../icons/IconSchedule';

import styles from './NavBarSideLeft.module.css';

function NavBarSideLeft() {
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  const activeLink = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <Transition in={isVisible} timeout={100}>
      {(state) => (
        <nav
          className={`${styles.nav} ${styles[state]}`}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <ul className={styles.list}>
            <li>
              <NavLink to="/race/schedule" className={activeLink}>
                {({ isActive }) => (
                  <div className={styles.link__box}>
                    <IconSchedule isActive={isActive} />
                    <span className={`${styles.link__name} ${styles[state]}`}>Расписание</span>
                  </div>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/race/history" className={activeLink}>
                {({ isActive }) => (
                  <div className={styles.link__box}>
                    <IconResults isActive={isActive} />
                    <span className={`${styles.link__name} ${styles[state]}`}>История</span>
                  </div>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/race/series" className={activeLink}>
                {({ isActive }) => (
                  <div className={styles.link__box}>
                    <IconWorld isActive={isActive} />
                    <span className={`${styles.link__name} ${styles[state]}`}>Серии гонок</span>
                  </div>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/race/statistics" className={activeLink}>
                {({ isActive }) => (
                  <div className={styles.link__box}>
                    <IconCup isActive={isActive} />
                    <span className={`${styles.link__name} ${styles[state]}`}>Статистика</span>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </Transition>
  );
}

export default NavBarSideLeft;
