import cn from 'classnames';
import { Link } from 'react-router-dom';

import { getCategoryStats } from '../../assets/constants';

import styles from './TeamStatistic.module.css';

/**
 * Широкий хедер команды со сводной статистикой.
 */
export default function TeamStatistic({
  stats: { events, riderMetrics, registeredEventsCount, seasonRating, seriesWins = [] },
}) {
  const { categories, medals, totalMembers } = riderMetrics;

  return (
    <div className={styles.header}>
      {/* Основная информация команды */}
      <div className={styles.mainInfo}>
        <Link to={'/race/statistics/teams'} className={styles.rankingSection}>
          <div className={styles.ranking}>
            <span className={styles.rankingLabel}>Рейтинг:</span>
            <span className={styles.rankingValue}>
              {seasonRating?.rank || <span>&mdash;</span>}
            </span>
          </div>
        </Link>
      </div>

      {/* Статистика команды */}
      <div className={styles.statsGrid}>
        {/* Участники */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Участники</h3>
            <span className={styles.statTotal}>{totalMembers}</span>
          </div>
          <div className={styles.categories}>
            {getCategoryStats(categories).map(({ cat, count, label }) => (
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
              <span className={styles.eventLabel}>Регистрация</span>
              <span className={styles.eventValue}>{registeredEventsCount}</span>
            </div>
          </div>
        </div>

        {/* Победы в сериях */}
        {/* <div className={styles.statCard}>
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
        </div> */}
      </div>
    </div>
  );
}
