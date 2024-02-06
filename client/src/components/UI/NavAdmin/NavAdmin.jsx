import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './NavAdmin.module.css';

const cx = classNames.bind(styles);

/**
 * Панель админа/модератора
 * @param {{ items : {to:string,title:string,icon:React.JSX.Element} }} to path страницы;
 * @param title название блока в меню;
 * @param icon иконка для блока меню в JSX;
 */
function NavAdmin({ items }) {
  return (
    <nav className={cx('wrapper')}>
      <ul className={cx('list')}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <NavLink to={item.to} className={cx('link')}>
                {({ isActive }) => (
                  <div className={cx('link__box')}>
                    <Icon isActive={isActive} color={'#444444'} />
                    <span className={cx({ active: isActive })}>{item.title}</span>
                  </div>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavAdmin;
