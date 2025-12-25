import styles from './SkeletonOrganizerCard.module.css';

export function SkeletonOrganizerCard({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.cardSkeleton}>
        <div className={styles.skeletonBackground}></div>

        <div className={styles.skeletonContentWrapper}>
          <div className={styles.skeletonLogoContainer}>
            <div className={styles.skeletonLogo}></div>
          </div>

          <div className={styles.skeletonTextContent}>
            <div className={styles.skeletonName}></div>
          </div>
        </div>
      </div>
    )
  );
}
