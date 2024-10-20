import { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addClasses as cns } from '../../../utils/additional-classes';
import { profileButtons, profileButtonsSeconds } from '../../../assets/profile-buttons';

import styles from './NavBarProfile.module.css';

function NavBarProfile({ zwiftId, addCls }) {
  const [buttons, setButtons] = useState(profileButtons);
  const { status, user } = useSelector((state) => state.checkAuth.value);

  useEffect(() => {
    if (status && zwiftId !== user.zwiftId && zwiftId !== 0) {
      // исключение меню Настройки если просматривается не свой профиль
      setButtons(profileButtons.filter((button) => button.page !== 'settings'));
    } else if (status && !user.zwiftId) {
      // если просматривается свой профиль, но не добавлен zwiftId,
      // то показывать только меню настроек
      setButtons(profileButtons.filter((button) => button.page === 'settings'));
    } else if (!status) {
      // исключение меню Настройки если не авторизован
      setButtons(profileButtons.filter((button) => button.page !== 'settings'));
    } else {
      setButtons(profileButtons);
    }
  }, [zwiftId, user]);

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
            to={`/profile/${zwiftId}/${buttonLink.page}`}
            key={buttonLink.id}
          >
            {buttonLink.name}
          </NavLink>
        ))}
      </div>

      <div className={styles.wrapper__buttons}>
        {profileButtonsSeconds.map((buttonLink, index) => (
          <NavLink
            className={({ isActive }) =>
              cn(styles.button, styles.button__solo, { [styles.active]: isActive })
            }
            to={`/profile/${zwiftId}/${buttonLink.page}`}
            key={buttonLink.id}
          >
            {buttonLink.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBarProfile;
