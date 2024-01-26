import { useSelector } from 'react-redux';

import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';

import styles from './FormCreateEvent.module.css';

/**
 * Форма добавления настроек для всего Эвента
 */
function FormCreateEvent() {
  const { eventMainParams, checkboxRules, checkboxTags } = useSelector(
    (state) => state.eventParamsCreate
  );

  return (
    <>
      <h4 className={styles.title}>Общие настройки заезда</h4>
      <div className={styles.form} name="zwiftEvent">
        <div className={styles.box__inputs}>
          <BoxParameter title={'ID заезда'}>{eventMainParams.id}</BoxParameter>
        </div>
      </div>
    </>
  );
}

export default FormCreateEvent;
