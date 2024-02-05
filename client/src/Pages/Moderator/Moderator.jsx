import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import useTitle from '../../hook/useTitle';
import IconEventCreate from '../../components/icons/IconEventCreate';
import IconEventEdit from '../../components/icons/IconEventEdit';
import IconEventAdd from '../../components/icons/IconEventAdd';

import styles from './Moderator.module.css';

const cx = classNames.bind(styles);

/**
 * Страница модераторов
 */
function Moderator() {
  useTitle('Управление Эвентами в Zwift');
  return (
    <section>
      <nav className={cx('wrapper')}>
        <ul className={cx('list')}>
          <li>
            <NavLink to="/zwift/event/create" className={cx('link')}>
              {({ isActive }) => (
                <div className={cx('link__box')}>
                  <IconEventCreate isActive={isActive} />
                  <span className={cx({ active: isActive })}>Создание</span>
                </div>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/zwift/event/add" className={cx('link')}>
              {({ isActive }) => (
                <div className={cx('link__box')}>
                  <IconEventAdd isActive={isActive} />
                  <span className={cx({ active: isActive })}>Добавление</span>
                </div>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/zwift/event/edit" className={cx('link')}>
              {({ isActive }) => (
                <div className={cx('link__box')}>
                  <IconEventEdit isActive={isActive} />
                  <span className={cx({ active: isActive })}>Редактирование</span>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </section>
  );
}

export default Moderator;
