import { Outlet } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';
import IconUsers from '../../components/icons/IconUsers';
import IconTeam from '../../components/icons/IconTeam';
import IconLog from '../../components/icons/IconLog';
import IconCreator from '../../components/icons/IconCreator';
import IconEmail from '../../components/icons/IconEmail';
import IconRider2 from '../../components/icons/IconRider2';
import IconRaceType from '../../components/icons/IconRaceType';

const items = [
  { to: '/admin/users', title: 'Пользователи', icon: IconUsers },
  { to: '/riders', title: 'Райдеры', icon: IconRider2 },
  { to: '/admin/clubs', title: 'Клубы', icon: IconTeam },
  { to: '/admin/organizer', title: 'Организаторы', icon: IconCreator },
  { to: '/admin/logs/admin', title: 'Логи модераторов', icon: IconLog },
  { to: '/admin/logs/errors', title: 'Логи ошибок', icon: IconLog },
  { to: '/admin/notifications', title: 'Оповещения', icon: IconEmail },
  { to: '/admin/others', title: 'Разное', icon: IconRaceType },
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
