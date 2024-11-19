import { Outlet, useMatch, useParams } from 'react-router-dom';

import IconRaceType from '../../components/icons/IconRaceType';
import useTitle from '../../hook/useTitle';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';

import styles from './UserModeration.module.css';

export default function UserModeration() {
  useTitle('Модерация пользователя');
  const { _id } = useParams();

  const matchRoot = useMatch(`/admin/users/${_id}`); // Проверяем соответствие корневому маршруту

  const items = [
    { to: `/admin/users/${_id}/main`, title: 'Главная', icon: IconRaceType },
    { to: `/admin/users/${_id}/activities`, title: 'Активности', icon: IconRaceType },
  ];

  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />

      {/* Контент, который отображается только на маршруте users/:_id */}
      {matchRoot && (
        <div className={styles.info}>
          <h2>Добро пожаловать!</h2>
          <p>Здесь вы можете управлять профилем пользователя.</p>
        </div>
      )}

      {/* Дочерние маршруты */}
      <Outlet />
    </section>
  );
}
