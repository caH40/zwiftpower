import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchGetClubsZwiftModerator } from '../../../redux/features/api/organizer/fetchClubsModerator';
import useTitle from '../../../hook/useTitle';

import styles from './OrganizerClubs.module.css';

/**
 * Страница добавления/редактирования клубов организатора и модераторов в нём.
 */
export default function OrganizerClubs() {
  useTitle('Управление Клубами');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetClubsZwiftModerator({ organizerId: '65c716d02b59c0bbe21b3936' }));
  }, []);
  return <section className={styles.wrapper}>OrganizerClubs</section>;
}
