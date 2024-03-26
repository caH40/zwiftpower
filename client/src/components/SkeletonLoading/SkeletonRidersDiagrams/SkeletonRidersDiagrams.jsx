import styles from './SkeletonRidersDiagrams.module.css';

/**
 * Компонент-заглушка для отображения загрузки данных о гонщиках в мероприятиях.
 * @param {Object} props - Свойства компонента.
 * @param {'loading' | 'resolved' | 'rejected'} props.status - Статус загрузки данных.
 * @param {number} props.quantityCharts - Количество диаграмм.
 * @returns {JSX.Element|null} Компонент, если статус загрузки равен 'loading', иначе null.
 */
function SkeletonRidersDiagrams({ status, quantityCharts = 1 }) {
  return (
    status === 'loading' && (
      <div className={styles.wrapper}>
        {Array(quantityCharts)
          .fill(null)
          .map((_, index) => (
            <div className={styles.chart} key={index} />
          ))}
      </div>
    )
  );
}

export default SkeletonRidersDiagrams;
