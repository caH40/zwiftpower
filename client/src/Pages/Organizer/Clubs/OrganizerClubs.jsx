import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchDeleteClubsZwiftModerator,
  fetchGetClubsZwiftModerator,
} from '../../../redux/features/api/organizer/fetchClubsModerator';
import { resetClubsModerator } from '../../../redux/features/api/organizer/clubsModeratorSlice';
import TableClubs from '../../../components/Tables/TableClubs/TableClubs';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import useTitle from '../../../hook/useTitle';

import styles from './OrganizerClubs.module.css';

/**
 * Страница добавления/редактирования клубов организатора и модераторов в нём.
 */
export default function OrganizerClubs({ organizerId }) {
  useTitle('Управление Клубами');
  const { clubs } = useSelector((state) => state.clubsModerator);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetClubsZwiftModerator({ organizerId }));

    return () => dispatch(resetClubsModerator());
  }, []);

  // удаление клуба из БД
  const deleteClub = (clubId, name) => {
    const confirmDelete = window.confirm(
      `Вы действительно хотите удалить клуб "${name}" из БД?`
    );

    if (!confirmDelete) {
      return dispatch(
        getAlert({ message: 'Отмена удаления клуба из БД', type: 'warning', isOpened: true })
      );
    }

    return dispatch(fetchDeleteClubsZwiftModerator({ clubId })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(getAlert({ message: res.payload.message, type: 'success', isOpened: true }));
        dispatch(fetchGetClubsZwiftModerator({ organizerId }));
      }
    });
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__wide}>
        <TableClubs
          clubs={clubs}
          deleteClub={deleteClub}
          // addModerator={addModerator}
          // deleteModerator={deleteModerator}
        />
      </div>
      <pre>{JSON.stringify(clubs, null, 2)}</pre>
    </section>
  );
}
