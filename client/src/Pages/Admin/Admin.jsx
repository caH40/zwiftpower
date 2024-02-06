import { Outlet } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';
import IconUsers from '../../components/icons/IconUsers';
import IconTeam from '../../components/icons/IconTeam';
import IconLog from '../../components/icons/IconLog';

const items = [
  { to: '/admin/users', title: 'Пользователи', icon: IconUsers },
  { to: '/admin/clubs', title: 'Клубы', icon: IconTeam },
  { to: '/admin/logs/admin', title: 'Логи модераторов', icon: IconLog },
  { to: '/admin/logs/errors', title: 'Логи ошибок', icon: IconLog },
];

/**
 * Страница модераторов
 */
function Admin() {
  useTitle('Админ страница');
  return (
    <section>
      <NavAdmin items={items} />
      <Outlet />
    </section>
  );
}

export default Admin;
