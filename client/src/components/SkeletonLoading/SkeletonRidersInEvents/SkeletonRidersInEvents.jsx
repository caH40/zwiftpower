import styles from './SkeletonRidersInEvents.module.css';

/**
 * Компонент-заглушка для отображения загрузки данных о гонщиках в мероприятиях.
 * @param {Object} props - Свойства компонента.
 * @param {'loading' | 'resolved' | 'rejected'} props.status - Статус загрузки данных.
 * @returns {JSX.Element|null} Компонент, если статус загрузки равен 'loading', иначе null.
 */
function SkeletonRidersInEvents({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.wrapper}>
        <div className={styles.chart} />
        <div className={styles.chart} />
        <div className={styles.chart} />
        <div className={styles.chart} />
      </div>
    )
  );
}

export default SkeletonRidersInEvents;
