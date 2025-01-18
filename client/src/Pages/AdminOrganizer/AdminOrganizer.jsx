import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { resetOrganizers } from '../../redux/features/api/organizer_admin/organizerAdminSlice';
import Button from '../../components/UI/Button/Button';
import TableOrganizer from '../../components/Tables/TableOrganizer/TableOrganizer';
import FormOrganizerAdmin from '../../components/UI/FormOrganizerAdmin/FormOrganizerAdmin';
import useTitle from '../../hook/useTitle';
import {
  fetchDeleteOrganizerAdmin,
  fetchGetOrganizerAdmin,
} from '../../redux/features/api/organizer_admin/fetchOrganizerAdmin';

import styles from './AdminOrganizer.module.css';

/**
 * Страница модерации Организаторами заездов
 */
function AdminOrganizer() {
  const [showForm, setShowFrom] = useState(false);
  useTitle('Модерация Организаторов заездов');
  const { organizers } = useSelector((state) => state.organizerAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetOrganizerAdmin());
    return () => dispatch(resetOrganizers());
  }, []);

  const getForm = () => {
    setShowFrom((prev) => !prev);
  };

  const deleteOrganizer = (organizerId, name) => {
    const confirm = window.confirm(`Вы действительно хотите удалить организатора "${name}"?`);
    if (confirm) {
      dispatch(fetchDeleteOrganizerAdmin(organizerId));
    } else {
      dispatch(
        getAlert({
          message: `Отмена удаления организатора "${name}!"`,
          type: 'warning',
          isOpened: true,
        })
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__wide}>
        <TableOrganizer organizers={organizers} deleteOrganizer={deleteOrganizer} />
      </div>

      <div className={styles.button__right}>
        <Button getClick={getForm}>Добавление организатора</Button>
      </div>
      {showForm && (
        <>
          <h2 className={styles.title}>Добавление организатора</h2>
          <div className={styles.group}>
            <FormOrganizerAdmin />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrganizer;
