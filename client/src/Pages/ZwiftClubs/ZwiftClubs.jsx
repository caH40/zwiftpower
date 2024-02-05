import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import { fetchGetZwiftClub } from '../../redux/features/api/zwif_club/fetchZwiftClub';
import { resetClub, setClubId } from '../../redux/features/api/zwif_club/zwiftClubSlice';
import TableClubs from '../../components/Tables/TableClubs/TableClubs';
import FormRequest from '../../components/Zwift/UI/FormRequest/FormRequest';
import JSONBlock from '../../components/JSONBlock/JSONBlock';

import { mockClubs } from './mock';

import styles from './ZwiftClubs.module.css';

/**
 * Список и добавление/удаление клуба в котором создаются заезды из Звифт в БД
 */
function ZwiftClubs() {
  useTitle('Управление клубами из Звифта');
  const { id, club } = useSelector((state) => state.zwiftClub);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === 0) {
      return undefined;
    }
    dispatch(fetchGetZwiftClub(id));

    return () => dispatch(resetClub());
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__wide}>
        <TableClubs clubs={mockClubs} />
      </div>
      <h2 className={styles.title}>Добавление клуба</h2>
      <div className={styles.group}>
        <FormRequest name={'Id Club'} reducer={setClubId} />
      </div>
      <JSONBlock json={club} />
    </section>
  );
}

export default ZwiftClubs;
