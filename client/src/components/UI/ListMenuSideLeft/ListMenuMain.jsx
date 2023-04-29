import React from 'react';
import { NavLink } from 'react-router-dom';

import IconCup from '../../icons/IconCup';
import IconWorld from '../../icons/IconWorld';
import IconResults from '../../icons/IconResults';
import IconSchedule from '../../icons/IconSchedule';
import IconFaq from '../../icons/IconFaq';

import styles from './ListMenu.module.css';

function ListMenuMain({ state }) {
  const activeLink = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;
  return (
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
        <NavLink to="/race/results" className={activeLink}>
          {({ isActive }) => (
            <div className={styles.link__box}>
              <IconResults isActive={isActive} />
              <span className={`${styles.link__name} ${styles[state]}`}>Результаты</span>
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
      <li>
        <NavLink to="/faq" className={activeLink}>
          {({ isActive }) => (
            <div className={styles.link__box}>
              <IconFaq isActive={isActive} />
              <span className={`${styles.link__name} ${styles[state]}`}>ЧЗВ</span>
            </div>
          )}
        </NavLink>
      </li>
    </ul>
  );
}

export default ListMenuMain;
