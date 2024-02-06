import { Outlet } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import IconEventCreate from '../../components/icons/IconEventCreate';
import IconEventEdit from '../../components/icons/IconEventEdit';
import IconEventAdd from '../../components/icons/IconEventAdd';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';

const items = [
  { to: '/zwift/event/create', title: 'Создание', icon: IconEventCreate },
  { to: '/zwift/event/add', title: 'Добавление', icon: IconEventAdd },
  { to: '/zwift/event/edit', title: 'Редактирование', icon: IconEventEdit },
];

/**
 * Страница модераторов
 */
function Moderator() {
  useTitle('Управление Эвентами в Zwift');
  return (
    <section>
      <NavAdmin items={items} />
      <Outlet />
    </section>
  );
}

export default Moderator;
