import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { profileButtons, profileButtonsSeconds } from '../../../assets/profile-buttons';

import styles from './NavBarProfile.module.css';

function NavBarProfile({ zwiftId, addCls }) {
  const { status, user } = useSelector((state) => state.checkAuth.value);
  const location = useLocation();

  // Отображать кнопку настроек только для своего профиля.
  const showSettings = status && zwiftId === user.zwiftId;

  // Не показывать кнопки при просмотре своего аккаунта если не добавлен zwiftId.
  const hideProfileButtons = status && !user.zwiftId && zwiftId === 0;

  const getStyle = (isActive, index) => {
    // в зависимости от относительного положения и количества кнопок применяются разные стили
    const quantityBtn = profileButtons.length;

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
      {!hideProfileButtons && (
        <div className={styles.wrapper__buttons}>
          {profileButtons.map((buttonLink, index) => (
            <NavLink
              className={({ isActive }) => getStyle(isActive, index)}
              to={`/profile/${zwiftId}/${buttonLink.page}`}
              key={buttonLink.id}
            >
              {buttonLink.name}
            </NavLink>
          ))}
        </div>
      )}

      {showSettings && (
        <div className={styles.wrapper__buttons}>
          {profileButtonsSeconds.map((buttonLink) => (
            <Link
              className={cn(styles.button, styles.button__solo, {
                [styles.active]: location.pathname.includes('settings'),
              })}
              to={`/profile/${zwiftId}/${buttonLink.page}`}
              key={buttonLink.id}
            >
              {buttonLink.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default NavBarProfile;
