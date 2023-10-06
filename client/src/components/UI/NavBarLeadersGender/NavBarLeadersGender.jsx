import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { LeadersGenderButtons } from '../../../assets/statistics-buttons';

import styles from './NavBarLeadersGender.module.css';

function NavBarLeadersGender({ addCls }) {
  const getStyle = (isActive, index) => {
    // в зависимости от относительного положения и количества кнопок применяются разные стили
    const quantityBtn = LeadersGenderButtons.length;
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
      {LeadersGenderButtons.map((buttonLink, index) => (
        <NavLink
          className={({ isActive }) => getStyle(isActive, index)}
          to={`/race/statistics/leaders/${buttonLink.page}`}
          key={buttonLink.id}
        >
          {buttonLink.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBarLeadersGender;
