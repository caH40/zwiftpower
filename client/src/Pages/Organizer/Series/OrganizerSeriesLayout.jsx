import { Outlet } from 'react-router-dom';

import IconModify from '../../../components/icons/IconModify';
import IconRaceType from '../../../components/icons/IconRaceType';
import NavAdmin from '../../../components/UI/NavAdmin/NavAdmin';
import useTitle from '../../../hook/useTitle';

import styles from './OrganizerSeriesLayout.module.css';

const items = [
  { to: '/organizer/series/list', title: 'Список', icon: IconRaceType },
  { to: '/organizer/series/create', title: 'Создание', icon: IconRaceType },
  { to: '/organizer/series/edit', title: 'Редактирование', icon: IconModify },
];

/**
 * Страница лейаут для работы с Сериями заездов.
 *
 * @param {Object} props - Пропсы.
 * @param {string} props.organizerId - _id организатора в БД.
 */
export default function OrganizerSeriesLayout() {
  useTitle('Серии заездов');

  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />

      <Outlet />
    </section>
  );
}
