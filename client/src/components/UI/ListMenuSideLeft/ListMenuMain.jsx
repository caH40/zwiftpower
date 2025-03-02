import { NavLink, useLocation } from 'react-router-dom';

import IconDiagram from '../../icons/IconDiagram';
import IconWorld from '../../icons/IconWorld';
import IconResults from '../../icons/IconResults';
import IconSchedule from '../../icons/IconSchedule';
import IconFaq from '../../icons/IconFaq';
import IconHome from '../../icons/IconHome';
import IconProfile from '../../icons/IconProfile';
import IconRider2 from '../../icons/IconRider2';
import IconStream from '../../icons/IconStream';
import IconOrganizerPublic from '../../icons/IconOrganizerPublic';

import styles from './ListMenu.module.css';

const iconItems = [
  { id: 0, to: '/', icon: IconHome, label: 'Домашняя' },
  { id: 1, to: '/race/schedule', icon: IconSchedule, label: 'Расписание' },
  { id: 2, to: '/race/results', icon: IconResults, label: 'Результаты' },
  { id: 3, to: '/organizers', icon: IconOrganizerPublic, label: 'Организаторы' },
  { id: 4, to: '/series', icon: IconWorld, label: 'Серии гонок' },
  { id: 5, to: '/race/statistics/main', icon: IconDiagram, label: 'Статистика' },
  { id: 6, to: '/riders', icon: IconRider2, label: 'Райдеры' },
  { id: 7, to: '/profile', icon: IconProfile, label: 'Профиль' },
  { id: 8, to: '/streams', icon: IconStream, label: 'Трансляции' },
  { id: 9, to: '/faq', icon: IconFaq, label: 'ЧЗВ' },
];

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
      {iconItems.map((iconItem) => {
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
