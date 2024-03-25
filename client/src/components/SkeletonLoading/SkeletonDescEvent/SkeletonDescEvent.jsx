import styles from './SkeletonDescEvent.module.css';

/**
 * Компонент-заглушка для отображения во время загрузки данных.
 * @param {Object} props - Свойства компонента.
 * @param {'loading' | 'resolved' | 'rejected'} props.status - Статус загрузки данных.
 * @returns {JSX.Element|null} Компонент SkeletonDescEvent, если статус загрузки равен 'loading', иначе null.
 */
function SkeletonDescEvent({ status }) {
  return status === 'loading' && <div className={styles.wrapper} />;
}

export default SkeletonDescEvent;
