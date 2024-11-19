import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetFitfiles } from '../../redux/features/api/fitfiles/fetchFitfiles';
import useTitle from '../../hook/useTitle';
import TableUsersActivities from '../../components/Tables/TableUsersActivities/TableUsersActivities';
import { resetFitfiles } from '../../redux/features/api/fitfiles/fitfilesSlice';

import styles from './UserModerationActivities.module.css';

export default function UserModerationActivities() {
  useTitle('Модерация активностей пользователя');
  const { _id } = useParams();
  const { fitfile } = useSelector((state) => state.fitfiles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetFitfiles({ _idUser: _id }));

    // Сброс хранилища для fitfile при размонтировании.
    return () => dispatch(resetFitfiles());
  }, []);

  return (
    <section className={styles.wrapper}>
      {fitfile && <TableUsersActivities _idUser={_id} activities={fitfile.activities} />}
    </section>
  );
}
