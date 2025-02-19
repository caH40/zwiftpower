import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetOrganizerModerator } from '../../redux/features/api/organizer/fetchOrganizerModerator';
import { resetOrganizerDataModerator } from '../../redux/features/api/organizer/organizerModeratorSlice';
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
export default function OrganizerLayout({ organizerId }) {
  const dispatch = useDispatch();
  const { organizer } = useSelector((state) => state.organizerModerator);

  // Запрос данных организатора organizerId
  useEffect(() => {
    dispatch(fetchGetOrganizerModerator({ organizerId }));

    return () => dispatch(resetOrganizerDataModerator());
  }, []);

  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />

      <h2 className={styles.title}>Организатор: {organizer.name}</h2>

      <Outlet />
    </section>
  );
}
