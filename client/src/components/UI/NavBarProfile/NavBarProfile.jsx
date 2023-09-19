import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addClasses as cns } from '../../../utils/additional-classes';
import { profileButtons } from '../../../assets/profile-buttons';

import styles from './NavBarProfile.module.css';

function NavBarProfile({ zwiftId, addCls }) {
  const [buttons, setButtons] = useState(profileButtons);
  const userAuth = useSelector((state) => state.checkAuth.value);

  useEffect(() => {
    if (zwiftId !== 'me') {
      // исключение меню Настройки если просматривается не свой профиль
      setButtons(profileButtons.filter((button) => button.page !== 'settings'));
    } else if (zwiftId === 'me' && !userAuth.user.zwiftId) {
      // если просматривается свой профиль, но не добавлен zwiftid, то показывать только меню настроек
      setButtons(profileButtons.filter((button) => button.page === 'settings'));
    } else {
      setButtons(profileButtons);
    }
  }, [zwiftId, userAuth]);

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
    <nav className={cn(styles.box, cns(styles, addCls))}>
      {buttons.map((buttonLink, index) => (
        <NavLink
          className={({ isActive }) => getStyle(isActive, index)}
          to={`/profile/${zwiftId}/${buttonLink.page}`}
          key={buttonLink.id}
        >
          {buttonLink.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBarProfile;
