import { useDispatch, useSelector } from 'react-redux';

import { organizers } from '../../../../assets/zwift/organizer';
import SimpleSelect from '../../../UI/SimpleSelect/SimpleSelect';
import { setClub } from '../../../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import SimpleSelectFunction from '../../../UI/SimpleSelect/SimpleSelectFunction';

import styles from './FormEditEvent.module.css';

/**
 * Выбор Клуба в котором создается Эвент
 */
function FormClub() {
  const dispatch = useDispatch();
  const { microserviceExternalResourceId: clubZwiftId } = useSelector(
    (state) => state.eventParams.eventMainParams
  );

  const setClubLocal = (label) => {
    const id = organizers.find((org) => org.label === label)?.clubZwiftId;
    dispatch(setClub(id));
  };

  return (
    <>
      <h4 className={styles.title}>Выбор Клуба в котором создается Эвент</h4>
      <SimpleSelectFunction
        state={{ name }}
        value={organizers.find((org) => org.clubZwiftId === clubZwiftId)?.name || ''}
        reducer={setClubLocal}
        options={organizers}
      />
    </>
  );
}

export default FormClub;
