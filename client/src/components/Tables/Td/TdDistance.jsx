import styles from './Td.module.css';
/**
 * ячейка таблицы отображающая дистанцию Эвента
 * три способа задать дистанцию Эвента:
 * 1. продолжительность заезда;
 * 2. расстояние в метрах;
 * 3. количество кругов;
 *
 * @param {number} durationInSeconds продолжительности заезда в миллисекундах
 * @param {number} distanceInMeters продолжительности заезда в миллисекундах, задается
 * @param {number} distanceInKilometers продолжительности заезда в миллисекундах, задается
 */
function TdDistance(durationInSeconds, distanceInMeters, distanceInKilometers) {
  // если задана durationInSeconds, то расстояние не рассчитывается/не показывается
  if (durationInSeconds !== 0) {
    return null;
  }

  const distance = Math.round(10 * (distanceInMeters / 1000)) / 10;
  const distanceEstimated = Math.round(10 * distanceInKilometers) / 10;

  return (
    <td>
      {distance !== 0 ? distance : distanceEstimated}
      <span className={styles.small}>км</span>
    </td>
  );
}

export default TdDistance;
