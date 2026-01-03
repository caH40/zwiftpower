import { getTimerLocal } from '../../utils/date-local';
import CloseButton from '../UI/Buttons/Close/CloseButton';

import styles from './CardTimePenalty.module.css';
/**
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.profile - Профиль райдера.
 * @param {Object[]} props.timePenalty - Массив временных штрафов.
 * @param {string} props.timePenalty.reason - Причина штрафа.
 * @param {number} props.timePenalty.timeInMilliseconds - Количество штрафных секунд.
 * @param {Object} props.timePenalty.moderator - Модератор, установивший штраф.
 * @param {string} props.timePenalty.modifiedAt - Дата и время изменения штрафа.
 */

export default function CardTimePenalty({
  timePenalty: { reason, timeInMilliseconds, moderator, modifiedAt },
  index,
  handleRemovePenalty,
}) {
  console.log(moderator);

  return (
    <div className={styles.wrapper}>
      <div className={styles.closeButton}>
        <CloseButton onClick={() => handleRemovePenalty(index)} />
      </div>

      <dl className={styles.list}>
        <dt className={styles.term}>Причина</dt>
        <dd className={styles.description}>{reason}</dd>
      </dl>
      <dl className={styles.list}>
        <dt className={styles.term}>Время</dt>
        <dd className={styles.description}>{timeInMilliseconds / 1000} секунд</dd>
      </dl>
      <dl className={styles.list}>
        <dt className={styles.term}>Модератор</dt>
        <dd className={styles.description}>{moderator.username}</dd>
      </dl>
      <dl className={styles.list}>
        <dt className={styles.term}>Дата</dt>
        <dd className={styles.description}>{getTimerLocal(modifiedAt, 'DDMMYYHm')}</dd>
      </dl>
    </div>
  );
}
