import MyTooltip from '../../HOC/MyTooltip';

import styles from './FinishTime.module.css';

/**
 * Компонент отображения финишного времени или статуса дисквалификации.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.time - Время в формате чч:мм:сс.ммм или статус DQ/DNF.
 * @param {boolean} [props.hideMs=false] - Флаг скрытия миллисекунд.
 * @param {{ status: boolean, reason: string, label: string }} [props.dsq] - Объект дисквалификации.
 */
export default function FinishTime({ time, hideMs = false, dsq }) {
  // Обработка случая дисквалификации.
  if (dsq?.status) {
    return (
      <MyTooltip tooltip={dsq.reason || 'aaaaaa'}>
        <div className={styles.dq}>{dsq.label ?? 'test'}</div>
      </MyTooltip>
    );
  }

  // Обработка пустого или нулевого времени.
  if (!time || time === '00:00.000') {
    return null;
  }

  // Скрыть миллисекунды или если миллисекунд нет.
  if (hideMs || !time.includes('.')) {
    return <div className={styles.time}>{time.split('.')[0]}</div>;
  }

  const [main, ms] = time.split('.');

  return (
    <div className={styles.time}>
      {main}
      <span className={styles.text__additional}>.{ms}</span>
    </div>
  );
}
