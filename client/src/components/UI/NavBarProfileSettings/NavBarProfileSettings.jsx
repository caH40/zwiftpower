import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { profileSettingsButtons } from '../../../assets/profile-buttons';

import styles from './NavBarProfileSettings.module.css';

function NavBarProfileSettings({ zwiftId, addCls }) {
  const { status, user } = useSelector((state) => state.checkAuth.value);

  // Отображать кнопку настроек только для своего профиля.
  const showSettings = status && zwiftId === user.zwiftId;

  // Не показывать кнопки при просмотре своего аккаунта если не добавлен zwiftId.
  const hideProfileButtons = status && !user.zwiftId && zwiftId === 0;

  const getStyle = (isActive, index) => {
    // в зависимости от относительного положения и количества кнопок применяются разные стили
    const quantityBtn = profileSettingsButtons.length;

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
          {profileSettingsButtons.map((buttonLink, index) => (
            <NavLink
              className={({ isActive }) => getStyle(isActive, index)}
              to={`/profile/${zwiftId}/settings/${buttonLink.page}`}
              key={buttonLink.id}
            >
              {buttonLink.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default NavBarProfileSettings;
