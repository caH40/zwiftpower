import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import useTitle from '../../hook/useTitle';
import {
  fetchDeleteZwiftClub,
  fetchGetZwiftClub,
  fetchGetZwiftClubs,
  fetchPostZwiftClub,
} from '../../redux/features/api/zwift_club/fetchZwiftClub';
import { resetClub, setClubId } from '../../redux/features/api/zwift_club/zwiftClubSlice';
import TableClubs from '../../components/Tables/TableClubs/TableClubs';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import { getAlert } from '../../redux/features/alertMessageSlice';
import FindUser from '../../components/UI/FindUser/FindUser';
import { fetchUsersZwiftpower } from '../../redux/features/api/user_zwiftpower/fetchUsersZwiftpower';

import BlockClubDescription from './BlockClubDescription';

import styles from './ZwiftClubs.module.css';

const cx = classNames.bind(styles);

/**
 * Список и добавление/удаление клуба в котором создаются заезды из Звифт в БД
 */
function ZwiftClubs() {
  const [showAddModerator, setShowAddModerator] = useState(false);

  const [clubCurrent, setClubCurrent] = useState({ id: '', name: '' });
  useTitle('Управление клубами из Звифта');
  const { id, club, clubs } = useSelector((state) => state.zwiftClub);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetZwiftClubs());
    return () => dispatch(resetClub());
  }, []);

  useEffect(() => {
    if (id === 0) {
      return;
    }
    dispatch(fetchGetZwiftClub(id));
  }, [dispatch, id]);

  // добавление клуба в БД
  const postClub = (club) => {
    dispatch(fetchPostZwiftClub(club));
  };

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

    return dispatch(fetchDeleteZwiftClub(clubId));
  };

  // открытие формы поиска Модератора для добавления его в клуб модератором
  const addModerator = (clubId, clubNameRaw) => {
    setClubCurrent({ id: clubId, name: clubNameRaw });
    dispatch(fetchUsersZwiftpower());
    setShowAddModerator(true);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__wide}>
        <TableClubs clubs={clubs} deleteClub={deleteClub} addModerator={addModerator} />
      </div>

      {showAddModerator && (
        <FindUser
          clubCurrent={clubCurrent}
          setClubCurrent={setClubCurrent}
          setShowAddModerator={setShowAddModerator}
        />
      )}
      <h2 className={styles.title}>Поиск клуба</h2>
      <div className={styles.group}>
        <FormRequest name={'Id Club'} reducer={setClubId} type={'text'} />
      </div>
      {club?.id && <BlockClubDescription club={club} postClub={postClub} />}
    </section>
  );
}

export default ZwiftClubs;
