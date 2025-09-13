import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { teamButtons, teamEditButton } from '../../../assets/team-buttons';

import styles from './NavBarTeamPublic.module.css';

export function NavBarTeamPublic({ urlSlug, addCls, isCreator }) {
  // Добавляем кнопку управления если пользователь является создателем команды.
  const buttons = isCreator ? [...teamButtons, teamEditButton] : teamButtons;

  const getStyle = (isActive, index) => {
    // в зависимости от относительного положения и количества кнопок применяются разные стили
    const quantityBtn = buttons.length;

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
    <nav className={cn(styles.wrapper, cns(styles, addCls))}>
      <div className={styles.wrapper__buttons}>
        {buttons.map((buttonLink, index) => (
          <NavLink
            className={({ isActive }) => getStyle(isActive, index)}
            to={`/teams/${urlSlug}${buttonLink.page}`}
            key={buttonLink.id}
            end={true}
          >
            {buttonLink.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
