import { Outlet, useParams } from 'react-router-dom';

import IconRaceType from '../../components/icons/IconRaceType';
import useTitle from '../../hook/useTitle';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';

import styles from './UserModeration.module.css';

export default function UserModeration() {
  useTitle('Модерация пользователя');
  const { _id } = useParams();

  const items = [
    { to: `/admin/users/${_id}/activities`, title: 'Активности', icon: IconRaceType },
  ];

  return (
    <section className={styles.wrapper}>
      <NavAdmin items={items} />
      <Outlet />
    </section>
  );
}
