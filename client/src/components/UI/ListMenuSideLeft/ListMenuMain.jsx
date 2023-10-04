import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import IconCup from '../../icons/IconCup';
import IconWorld from '../../icons/IconWorld';
import IconResults from '../../icons/IconResults';
import IconSchedule from '../../icons/IconSchedule';
import IconFaq from '../../icons/IconFaq';
import IconHome from '../../icons/IconHome';

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
      <li>
        <NavLink to="/" className={activeLink}>
          {({ isActive }) => (
            <div className={styles.link__box}>
              <IconHome isActive={isActive} />
              <span className={`${styles.link__name} ${styles[state]}`}>Домашняя</span>
            </div>
          )}
        </NavLink>
      </li>

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
        <NavLink to="/race/statistics/main" className={activeLinkStatistics}>
          <div className={styles.link__box}>
            <IconCup isActive={isActivePageStatistics} />
            <span className={`${styles.link__name} ${styles[state]}`}>Статистика</span>
          </div>
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
