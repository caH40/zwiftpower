import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { statisticsButtons } from '../../../assets/statistics-buttons';

import styles from './NavBarProfile.module.css';

function NavBarStatistics({ addCls }) {
  const getStyle = (isActive, index) => {
    // в зависимости от относительного положения и количества кнопок применяются разные стили
    const quantityBtn = statisticsButtons.length;
    const positions = {
      [styles.button__left]: index === 0 && quantityBtn !== 1,
      [styles.button__center]: index !== 0 && quantityBtn > 2 && index + 1 !== quantityBtn,
      [styles.button__right]: index !== 0 && index + 1 === quantityBtn,
    };

    if (isActive) {
      return cn(styles.button, styles.active, positions);
    } else {
      return cn(styles.button, positions);
    }
  };

  return (
    <nav className={cn(styles.box, cns(styles, addCls))}>
      {statisticsButtons.map((buttonLink, index) => (
        <NavLink
          className={({ isActive }) => getStyle(isActive, index)}
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
