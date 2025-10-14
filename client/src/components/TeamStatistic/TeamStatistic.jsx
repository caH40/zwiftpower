import cn from 'classnames';

import styles from './TeamStatistic.module.css';

const seriesWins = [
  { name: 'Test Racing League 2023', place: 1 },
  { name: 'Test Championship', place: 2 },
  { name: 'Test Summer Climb 2024', place: 1 },
  { name: 'Test Winter Cup', place: 3 },
];

/**
 * Широкий хедер команды со сводной статистикой.
 */
export default function TeamStatistic({ stats: { events, riderMetrics } }) {
  const { categories, medals, totalMembers } = riderMetrics;

  // Статистика по категориям
  const categoryStats = [
    { cat: 'A', count: categories.A || 0, label: 'Cat A' },
    { cat: 'B', count: categories.B || 0, label: 'Cat B' },
    { cat: 'C', count: categories.C || 0, label: 'Cat C' },
    { cat: 'D', count: categories.D || 0, label: 'Cat D' },
    { cat: 'E', count: categories.E || 0, label: 'Cat E' },
  ];

  return (
    <div className={styles.header}>
      {/* Основная информация команды */}
      {/* <div className={styles.mainInfo}>
        <div className={styles.rankingSection}>
          <div className={styles.ranking}>
            <span className={styles.rankingLabel}>Рейтинг</span>
            <span className={styles.rankingValue}>#{ranking || 'н/д'}</span>
          </div>
        </div>
      </div> */}

      {/* Статистика команды */}
      <div className={styles.statsGrid}>
        {/* Участники */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Участники</h3>
            <span className={styles.statTotal}>{totalMembers}</span>
          </div>
          <div className={styles.categories}>
            {categoryStats.map(({ cat, count, label }) => (
              <div key={cat} className={styles.categoryItem}>
                <span className={cn(styles.catDot, styles[cat])}></span>
                <span className={styles.catLabel}>{label}</span>
                <span className={styles.catCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Медали */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Медали</h3>
            <span className={styles.statTotal}>
              {(medals.gold || 0) + (medals.silver || 0) + (medals.bronze || 0)}
            </span>
          </div>
          <div className={styles.medals}>
            <div className={styles.medalItem}>
              <span className={cn(styles.medal, styles.gold)}>🥇</span>
              <span className={styles.medalCount}>{medals.gold || 0}</span>
            </div>
            <div className={styles.medalItem}>
              <span className={cn(styles.medal, styles.silver)}>🥈</span>
              <span className={styles.medalCount}>{medals.silver || 0}</span>
            </div>
            <div className={styles.medalItem}>
              <span className={cn(styles.medal, styles.bronze)}>🥉</span>
              <span className={styles.medalCount}>{medals.bronze || 0}</span>
            </div>
          </div>
        </div>

        {/* Заезды */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Заезды</h3>
            <span className={styles.statTotal}>{events.totalResults}</span>
          </div>
          <div className={styles.eventsStats}>
            <div className={styles.eventStat}>
              <span className={styles.eventLabel}>В этом сезоне</span>
              <span className={styles.eventValue}>{events.resultsInActiveSeason}</span>
            </div>
            <div className={styles.eventStat}>
              <span className={styles.eventLabel}>Зарегистрированы</span>
              <span className={styles.eventValue}>{0}</span>
            </div>
          </div>
        </div>

        {/* Победы в сериях */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Победы в сериях</h3>
            <span className={styles.statTotal}>{seriesWins.length}</span>
          </div>
          <div className={styles.seriesWins}>
            {seriesWins.slice(0, 3).map((series, index) => (
              <div key={index} className={styles.seriesItem}>
                <span className={styles.seriesName}>{series.name}</span>
                <span className={cn(styles.seriesPlace, styles[`place${series.place}`])}>
                  {series.place} место
                </span>
              </div>
            ))}
            {seriesWins.length > 3 && (
              <div className={styles.moreSeries}>+{seriesWins.length - 3} ещё</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
