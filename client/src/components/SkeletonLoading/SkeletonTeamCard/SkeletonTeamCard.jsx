import styles from './SkeletonTeamCard.module.css';

export function SkeletonTeamCard({ status }) {
  return (
    status === 'loading' && (
      <div className={styles.cardSkeleton}>
        <div className={styles.skeletonBackground}></div>

        <div className={styles.skeletonContentWrapper}>
          <div className={styles.skeletonLogoContainer}>
            <div className={styles.skeletonLogo}></div>
          </div>

          <div className={styles.skeletonTextContent}>
            <div className={styles.skeletonTeamName}></div>
            <div className={styles.skeletonViewText}></div>
          </div>
        </div>
      </div>
    )
  );
}
