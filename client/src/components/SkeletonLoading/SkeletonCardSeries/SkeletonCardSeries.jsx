import styles from './SkeletonCardSeries.module.css';

export function SkeletonCardSeries({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.cardSkeleton}>
        <div className={styles.skeletonBackground}></div>

        <div className={styles.skeletonContent}>
          <div className={styles.skeletonName}></div>
          <div className={styles.skeletonDates}></div>
        </div>
      </div>
    )
  );
}
