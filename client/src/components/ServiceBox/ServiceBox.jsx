import { getTimerLocal } from '../../utils/date-local';
import { getEditDate } from '../../utils/edit-date';

import styles from './ServiceBox.module.css';

/**
 * Информация о последнем обновлении и изменении (модератором) результатов Эвента
 */
function ServiceBox({ modifiedResults, updated }) {
  return (
    <div className={styles.right}>
      <span className={styles.box__service}>
        <span className={styles.service}>Обновлено:</span>
        <span className={styles.service}>{getTimerLocal(updated, 'DDMMYYHm')}</span>
      </span>
      {modifiedResults?.hasModified && (
        <span className={styles.box__service}>
          <span className={styles.service}>Изменено:</span>
          <span className={styles.service}>{getEditDate(modifiedResults?.moderators)}</span>
        </span>
      )}
    </div>
  );
}

export default ServiceBox;
