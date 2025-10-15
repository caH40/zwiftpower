import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetOrganizerModerator } from '../../redux/features/api/organizer/fetchOrganizerModerator';
import { resetOrganizerDataModerator } from '../../redux/features/api/organizer/organizerModeratorSlice';
import IconUsers from '../../components/icons/IconUsers';
import NavAdmin from '../../components/UI/NavAdmin/NavAdmin';
import IconCupRank from '../../components/icons/IconCupRank';

import styles from './OrganizerLayout.module.css';

const items = [
  { to: '/organizer/main', title: 'Главная', icon: IconUsers },
  { to: '/organizer/clubs', title: 'Клубы', icon: IconUsers },
  { to: '/organizer/bots', title: 'Бот', icon: IconUsers },
  { to: '/organizer/series/list', title: 'Серии заездов', icon: IconCupRank },
];

/**
 * Layout для страниц управления организатором.
 */
export default function OrganizerLayout({ organizerId }) {
  const dispatch = useDispatch();
  // const { organizer } = useSelector((state) => state.organizerModerator);

  // Запрос данных организатора organizerId
  useEffect(() => {
    dispatch(fetchGetOrganizerModerator({ organizerId }));

    return () => dispatch(resetOrganizerDataModerator());
  }, [dispatch, organizerId]);

  return (
    <section className={styles.wrapper}>
      {/* <h2 className={styles.title}>{organizer.name}</h2> */}

      <NavAdmin items={items} />

      <Outlet />
    </section>
  );
}
