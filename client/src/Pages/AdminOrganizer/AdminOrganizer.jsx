import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { resetOrganizers } from '../../redux/features/api/organizer_admin/organizerAdminSlice';
import Button from '../../components/UI/Button/Button';
import TableOrganizer from '../../components/Tables/TableOrganizer/TableOrganizer';
import FormOrganizer from '../../components/UI/FormOrganizer/FormOrganizer';
import useTitle from '../../hook/useTitle';
import { fetchGetOrganizerAdmin } from '../../redux/features/api/organizer_admin/fetchOrganizerAdmin';

import styles from './AdminOrganizer.module.css';

// const organizers = [{ _id: 0, name: 'KOM-on', creator: 'Faber' }];

/**
 * Страница модерации Организаторами заездов
 */
function AdminOrganizer() {
  const [showForm, setShowFrom] = useState(false);
  useTitle('Модерация Организаторов заездов');
  const { organizers } = useSelector((state) => state.organizerAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGetOrganizerAdmin();
    return () => dispatch(resetOrganizers());
  }, []);

  const getForm = () => {
    setShowFrom((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__wide}>
        <TableOrganizer organizers={organizers} />
      </div>

      <div className={styles.button__right}>
        <Button getClick={getForm}>Добавление организатора</Button>
      </div>
      {showForm && (
        <>
          <h2 className={styles.title}>Добавление организатора</h2>
          <div className={styles.group}>
            <FormOrganizer />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrganizer;
