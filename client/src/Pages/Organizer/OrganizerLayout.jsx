import { Outlet } from 'react-router-dom';

import IconUsers from '../../components/icons/IconUsers';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';

import styles from './OrganizerLayout.module.css';

const items = [
  { to: '/organizer/main', title: 'Главная', icon: IconUsers },
  { to: '/organizer/clubs', title: 'Клубы', icon: IconUsers },
  { to: '/organizer/bots', title: 'Бот', icon: IconUsers },
];

/**
 * Layout для страниц управления организатором.
 * 1. Добавление бота; Первоначально попробовать генерировать и сохранять token в БД.
 * 2. Добавление клубов и модераторов к нему;
 * 3. Редактирование названия;
 * 4. Редактирование лейбла;
 * 5. Редактирование фоновая картинки;
 * 6. Редактирование описания;
 */
export default function OrganizerLayout() {
  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />
      <Outlet />
    </section>
  );
}
