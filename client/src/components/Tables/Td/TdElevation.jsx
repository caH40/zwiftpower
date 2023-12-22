import styles from './Td.module.css';
/**
 * ячейка таблицы отображающая общий набор высоты в Эвенте
 * три способа задать дистанцию Эвента:
 * 1. продолжительность заезда;
 * 2. расстояние в метрах;
 * 3. количество кругов;
 *
 * @param {number} durationInSeconds продолжительности заезда в миллисекундах
 * @param {number} distanceInMeters продолжительности заезда в миллисекундах
 * @param {number} elevationGainInMeters общий набор высоты в метрах
 */
function TdElevation(durationInSeconds, distanceInMeters, elevationGainInMeters) {
  // если задана durationInSeconds, то набор высоты не рассчитывается/не показывается
  // если задана distanceInMeters, то набор высоты не рассчитывается/не показывается
  if (durationInSeconds !== 0 || distanceInMeters !== 0 || !elevationGainInMeters) {
    return <td></td>;
  }

  return (
    <td>
      {elevationGainInMeters}
      <span className={styles.small}>м</span>
    </td>
  );
}

export default TdElevation;
