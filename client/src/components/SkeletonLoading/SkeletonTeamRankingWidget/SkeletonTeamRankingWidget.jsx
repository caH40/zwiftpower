import styles from './SkeletonTeamRankingWidget.module.css';

export default function SkeletonTeamRankingWidget({ status }) {
  return status === 'loading' ? (
    <div className={styles.widgetSkeleton}>
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.viewAll}></div>
      </div>

      <div className={styles.rankingList}>
        {[...Array(3)].map((_, index) => (
          <TeamCardSkeleton key={index} />
        ))}
      </div>
    </div>
  ) : null;
}

function TeamCardSkeleton() {
  return (
    <div className={styles.teamCard}>
      <div className={styles.placeBadge}></div>

      <div className={styles.teamInfo}>
        <div className={styles.teamLogo}></div>

        <div className={styles.teamDetails}>
          <div className={styles.teamName}></div>
          <div className={styles.teamShortName}></div>
        </div>
      </div>
    </div>
  );
}
