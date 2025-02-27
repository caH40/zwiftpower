import { Outlet } from 'react-router-dom';

import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';
import IconRaceType from '../../components/icons/IconRaceType';

/**
 * Лейаут для небольших страниц администратора для конфигурации разных сущностей.
 */
const items = [
  { to: '/admin/others/finish-protocol', title: 'Финишный протокол', icon: IconRaceType },
];

export default function AdminOthersLayout() {
  return (
    <section>
      <NavAdmin items={items} />
      <Outlet />
    </section>
  );
}
