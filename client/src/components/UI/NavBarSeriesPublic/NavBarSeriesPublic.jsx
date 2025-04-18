import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import { seriesPublicButtons } from '../../../assets/series-buttons';

import styles from './NavBarSeriesPublic.module.css';

export default function NavBarSeriesPublic({ urlSlug, addCls }) {
  const location = useLocation();

  const getStyle = (isActive, index, btn) => {
    // Проверка для дочерних страниц, если название btn содержится в path дочерней страницы.
    const isChildPage = location.pathname.includes(btn);

    // в зависимости от относительного положения и количества кнопок применяются разные стили
    const quantityBtn = seriesPublicButtons.length;

    const positions = {
      [styles.button__left]: index === 0 && quantityBtn !== 1,
      [styles.button__center]: index !== 0 && quantityBtn > 2 && index + 1 !== quantityBtn,
      [styles.button__right]: index !== 0 && index + 1 === quantityBtn,
    };

    if (isActive || isChildPage) {
      return cn(styles.button, styles.active, positions);
    } else {
      return cn(styles.button, positions);
    }
  };

  return (
    <nav className={cn(styles.wrapper, cns(styles, addCls))}>
      <div className={styles.wrapper__buttons}>
        {seriesPublicButtons.map((buttonLink, index) => (
          <NavLink
            className={({ isActive }) => getStyle(isActive, index, buttonLink.page)}
            to={`/series/${urlSlug}${buttonLink.page}`}
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
