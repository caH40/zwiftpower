import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchDeleteClubsZwiftModerator,
  fetchGetClubsZwiftModerator,
  fetchGetClubZwiftModerator,
  fetchPostClubsZwiftModerator,
} from '../../../redux/features/api/organizer/fetchClubsModerator';
import {
  resetClubsModerator,
  setClubId,
} from '../../../redux/features/api/organizer/clubsModeratorSlice';
import TableClubs from '../../../components/Tables/TableClubs/TableClubs';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import useTitle from '../../../hook/useTitle';
import FormRequest from '../../../components/Zwift/UI/FormRequest/FormRequest';

import BlockClubDescription from './BlockClubDescription';

import styles from './OrganizerClubs.module.css';

/**
 * Страница добавления/редактирования клубов организатора и модераторов в нём.
 */
export default function OrganizerClubs({ organizerId }) {
  useTitle('Управление Клубами');
  const { clubs, clubForAdd, id } = useSelector((state) => state.clubsModerator);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetClubsZwiftModerator({ organizerId }));

    return () => dispatch(resetClubsModerator());
  }, []);

  useEffect(() => {
    if (id === 0) {
      return;
    }
    dispatch(fetchGetClubZwiftModerator({ clubId: id }));
  }, [dispatch, id]);

  // Удаление клуба из БД.
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

  // Добавление клуба в БД.
  const postClub = (club) => {
    if (!club.id) {
      getAlert({ message: 'Не получен id добавляемого клуба!', type: 'error', isOpened: true });
      return;
    }

    dispatch(fetchPostClubsZwiftModerator({ club, organizerId })).then((res) => {
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

      <div className={styles.group}>
        <FormRequest name={'Id Club'} reducer={setClubId} type={'text'} />
      </div>

      {clubForAdd?.id && <BlockClubDescription club={clubForAdd} postClub={postClub} />}
    </section>
  );
}
