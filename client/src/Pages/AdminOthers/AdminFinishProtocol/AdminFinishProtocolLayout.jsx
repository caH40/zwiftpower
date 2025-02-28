import { Outlet } from 'react-router-dom';

import NavAdmin from '../../../components/UI/NavAdmin/NavAdmin';
import IconRaceType from '../../../components/icons/IconRaceType';

import styles from './AdminFinishProtocolLayout.module.css';

const items = [
  {
    to: '/admin/others/finish-protocol/edit',
    title: 'Редактирование',
    icon: IconRaceType,
  },
  {
    to: '/admin/others/finish-protocol/create',
    title: 'Создание',
    icon: IconRaceType,
  },
];

/**
 * Страница редактирования пакета конфигурации финишного протокола.
 */
export default function AdminFinishProtocolLayout() {
  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />

      <h2 className={styles.title}>Работа с конфигурациями финишных протоколов</h2>

      <Outlet />
    </section>
  );
}
