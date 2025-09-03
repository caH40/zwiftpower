import { useDispatch, useSelector } from 'react-redux';

import { setClub } from '../../../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import SimpleSelectFunction from '../../../UI/SimpleSelect/SimpleSelectFunction';

import styles from './FormEditEvent.module.css';

/**
 * Выбор Клуба в котором создается Эвент
 */
function FormClub({ clubs = [] }) {
  // const { moderator } = useSelector((state) => state.checkAuth.value.user);
  const dispatch = useDispatch();
  const { microserviceExternalResourceId: clubZwiftId } = useSelector(
    (state) => state.eventParams.eventMainParams
  );

  // создание объекта для Selector
  const clubsCurrentForm = clubs.map((club) => ({
    id: club._id,
    value: club.name,
    name: club.name,
    label: club.name,
    clubZwiftId: club.id,
  }));

  const setClubLocal = (label) => {
    const id = clubsCurrentForm.find((org) => org.label === label)?.clubZwiftId;
    dispatch(setClub(id));
  };

  return (
    <>
      <h4 className={styles.title}>Выбор Клуба в котором создается Эвент</h4>
      <SimpleSelectFunction
        value={clubsCurrentForm.find((org) => org.clubZwiftId === clubZwiftId)?.name || ''}
        reducer={setClubLocal}
        options={clubsCurrentForm}
      />
    </>
  );
}

export default FormClub;
