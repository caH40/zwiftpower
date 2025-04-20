import DSQBox from '../DSQBox/DSQBox';
import IconCupRank from '../icons/IconCupRank';

import styles from './Rank.module.css';

/**
 * Компонент отображения ранка (места) или причины дисквалификации.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {number} props.value - Значение ранка (место).
 * @param {{ status: boolean, reason: string, label: string }} [props.dsq] - Объект дисквалификации.
 */
export default function Rank({ value, dsq }) {
  // Показываем иконку кубка за топ-3, если нет дисквалификации.
  if ([1, 2, 3].includes(value) && !dsq?.status) {
    return (
      <div className={styles.rank}>
        <IconCupRank place={value} />
      </div>
    );
  }

  // Показываем метку дисквалификации.
  if (dsq?.status) {
    return (
      <div className={styles.rank}>
        <DSQBox tooltip={dsq.reason}>{dsq.label ?? 'DSQ'}</DSQBox>
      </div>
    );
  }

  // Просто отображаем ранк (место).
  return <div className={styles.rank}>{value}</div>;
}
