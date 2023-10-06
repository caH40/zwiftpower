import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { getNavStyle } from '../../../hook/getNavStyle';
import { getActivePage } from '../../../hook/getActivePage';
import { addClasses as cns } from '../../../utils/additional-classes';
import { statisticsButtons as buttons } from '../../../assets/statistics-buttons';

import styles from './NavBarProfile.module.css';

function NavBarStatistics({ addCls }) {
  const { pathname } = useLocation();
  return (
    <nav className={cn(styles.box, cns(styles, addCls))}>
      {buttons.map((buttonLink, index) => (
        <NavLink
          className={() =>
            getNavStyle(
              getActivePage(pathname, buttonLink.page, 'main', 'leaders'),
              index,
              styles,
              buttons.length
            )
          }
          to={`/race/statistics/${buttonLink.page}`}
          key={buttonLink.id}
        >
          {buttonLink.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBarStatistics;
