import cn from 'classnames';

import styles from './SkeletonTeamAchievements.module.css';

/**
 * Скелетон для хедера команды со сводной статистикой.
 */
export default function SkeletonTeamAchievements({ status }) {
  return status === 'loading' ? (
    <div className={styles.header}>
      {/* Скелетон основной информации команды */}
      <div className={styles.mainInfo}>
        <div className={styles.rankingSection}>
          <div className={styles.ranking}>
            <span className={styles.rankingLabel}></span>
            <span className={styles.rankingValue}></span>
          </div>
        </div>
      </div>

      {/* Скелетон статистики команды */}
      <div className={styles.statsGrid}>
        {/* Участники */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}></h3>
            <span className={styles.statTotal}></span>
          </div>
          <div className={styles.categories}>
            {[...Array(5)].map((_, index) => (
              <div key={index} className={styles.categoryItem}>
                <span className={cn(styles.catDot, styles.skeletonDot)}></span>
                <span className={styles.catLabel}></span>
                <span className={styles.catCount}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Медали */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}></h3>
            <span className={styles.statTotal}></span>
          </div>
          <div className={styles.medals}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={styles.medalItem}>
                <span className={cn(styles.medal, styles.skeletonMedal)}></span>
                <span className={styles.medalCount}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Заезды */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}></h3>
            <span className={styles.statTotal}></span>
          </div>
          <div className={styles.eventsStats}>
            {[...Array(2)].map((_, index) => (
              <div key={index} className={styles.eventStat}>
                <span className={styles.eventLabel}></span>
                <span className={styles.eventValue}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Победы в сериях (если нужно) */}
        {/* <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}></h3>
            <span className={styles.statTotal}></span>
          </div>
          <div className={styles.seriesWins}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={styles.seriesItem}>
                <span className={styles.seriesName}></span>
                <span className={styles.seriesPlace}></span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  ) : null;
}
