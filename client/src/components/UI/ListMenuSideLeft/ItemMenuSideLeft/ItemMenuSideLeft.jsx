import { NavLink } from 'react-router-dom';
import cn from 'classnames/bind';

import styles from '../ListMenu.module.css';

const cx = cn.bind(styles);

/**
 * Компонент для элемента бокового меню с поддержкой анимаций переходов.
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.state - Состояние перехода (entering, entered, exiting, exited).
 * @param {string} props.to - Путь для навигации, используется для `NavLink`.
 * @param {string} props.name - Название элемента меню, отображается в интерфейсе.
 * @param {React.ComponentType} props.Icon - Компонент иконки, отображаемый слева от названия.
 * @param {Object} props.iconProps - Дополнительные свойства для компонента иконки.
 *
 * @returns {JSX.Element} Элемент списка для бокового меню с анимацией.
 */
export default function ItemMenuSideLeft({ state, to, name, Icon, iconProps }) {
  const activeLink = ({ isActive }) => cx('link', { active: isActive });
  return (
    <li>
      <NavLink to={to} className={activeLink}>
        {({ isActive }) => (
          <div className={cx('link__box')}>
            <Icon isActive={isActive} {...iconProps} />
            <span className={cx('link__name', state)}>{name}</span>
          </div>
        )}
      </NavLink>
    </li>
  );
}
