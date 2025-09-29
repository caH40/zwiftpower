import { Link } from 'react-router-dom';
import cn from 'classnames';

import Flag from '../Flag/Flag';

import styles from './TeamStatistic.module.css';

const teamData = {
  id: '123',
  name: 'Speed Racers Pro',
  imageSrc: '/images/team-logo.jpg',
  countryAlpha3: 'usa',
  category: 'A',
  totalMembers: 24,
  membersByCategory: {
    A: 8,
    B: 6,
    C: 5,
    D: 3,
    E: 2,
  },
  totalEvents: 156,
  totalMedals: {
    gold: 12,
    silver: 8,
    bronze: 15,
  },
  seriesWins: [
    { name: 'Zwift Racing League S4', place: 1 },
    { name: 'TFC Championship', place: 2 },
    { name: 'Summer Climb Series', place: 1 },
    { name: 'Winter Cup', place: 3 },
  ],
  ranking: 5,
  description: 'Профессиональная команда с фокусом на горные дисциплины и выносливость',
  establishedYear: 2020,
};

/**
 * Широкий хедер команды со сводной статистикой.
 */
export default function TeamStatistic({
  team: {
    id,
    name,
    imageSrc,
    countryAlpha3,
    category = 'B',
    totalMembers,
    membersByCategory = {},
    totalEvents,
    totalMedals = {},
    seriesWins = [],
    ranking,
    description,
    establishedYear,
  },
} = teamData) {
  const catClass = category ? category : 'gray';

  // Статистика по категориям
  const categoryStats = [
    { cat: 'A', count: membersByCategory.A || 0, label: 'Cat A' },
    { cat: 'B', count: membersByCategory.B || 0, label: 'Cat B' },
    { cat: 'C', count: membersByCategory.C || 0, label: 'Cat C' },
    { cat: 'D', count: membersByCategory.D || 0, label: 'Cat D' },
    { cat: 'E', count: membersByCategory.E || 0, label: 'Cat E' },
  ];

  return (
    <div className={styles.header}>
      {/* Основная информация команды */}
      <div className={styles.mainInfo}>
        <div className={styles.logoSection}>
          {imageSrc ? (
            <img src={imageSrc} alt={name} className={styles.logo} />
          ) : (
            <div className={styles.logoPlaceholder}>{name?.[0]}</div>
          )}
          <div className={styles.flag}>
            <Flag name={countryAlpha3} width={28} height={21} />
          </div>
        </div>

        <div className={styles.teamDetails}>
          <h1 className={styles.teamName}>{name}</h1>
          {description && <p className={styles.description}>{description}</p>}
          <div className={styles.metaInfo}>
            {establishedYear && (
              <span className={styles.established}>Основана в {establishedYear}</span>
            )}
            <span className={cn(styles.category, styles[catClass])}>Cat {category}</span>
          </div>
        </div>

        <div className={styles.rankingSection}>
          <div className={styles.ranking}>
            <span className={styles.rankingLabel}>Рейтинг</span>
            <span className={styles.rankingValue}>#{ranking || 'н/д'}</span>
          </div>
        </div>
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
              {(totalMedals.gold || 0) + (totalMedals.silver || 0) + (totalMedals.bronze || 0)}
            </span>
          </div>
          <div className={styles.medals}>
            <div className={styles.medalItem}>
              <span className={cn(styles.medal, styles.gold)}>🥇</span>
              <span className={styles.medalCount}>{totalMedals.gold || 0}</span>
            </div>
            <div className={styles.medalItem}>
              <span className={cn(styles.medal, styles.silver)}>🥈</span>
              <span className={styles.medalCount}>{totalMedals.silver || 0}</span>
            </div>
            <div className={styles.medalItem}>
              <span className={cn(styles.medal, styles.bronze)}>🥉</span>
              <span className={styles.medalCount}>{totalMedals.bronze || 0}</span>
            </div>
          </div>
        </div>

        {/* Заезды */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Заезды</h3>
            <span className={styles.statTotal}>{totalEvents}</span>
          </div>
          <div className={styles.eventsStats}>
            <div className={styles.eventStat}>
              <span className={styles.eventLabel}>В этом сезоне</span>
              <span className={styles.eventValue}>{totalEvents}</span>
            </div>
            <div className={styles.eventStat}>
              <span className={styles.eventLabel}>Активных</span>
              <span className={styles.eventValue}>{Math.round(totalEvents * 0.7)}</span>
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

      {/* Быстрые действия */}
      <div className={styles.actions}>
        <Link to={`/team/${id}/members`} className={styles.actionButton}>
          👥 Состав команды
        </Link>
        <Link to={`/team/${id}/results`} className={styles.actionButton}>
          📊 Результаты
        </Link>
        <Link to={`/team/${id}/calendar`} className={styles.actionButton}>
          🗓️ Календарь
        </Link>
      </div>
    </div>
  );
}
