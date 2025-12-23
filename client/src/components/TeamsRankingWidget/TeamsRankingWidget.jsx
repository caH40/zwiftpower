import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './TeamsRankingWidget.module.css';

/**
 * Виджет рейтинга команд (первые три места)
 * @param {Object} props - Пропсы.
 * @param {Array} props.teams - Массив команд.
 * @param {string} props.teams[].name - Название.
 * @param {string} props.teams[].shortName - Короткое название.
 * @param {string} props.teams[].urlSlug - urlSlug для перехода.
 * @param {Record<string,string>} props.teams[].logoUrls - url логотипа.
 * @param {Record<string,string>} props.teams[].posterUrls - url постера.
 * @param {string} props.teams[]._id - id в БД.
 * @param {number} props.teams[].rating - Рейтинг команды.
 */
export default function TeamsRankingWidget({ teams = [] }) {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h2 className={styles.title}>Топ команд</h2>
        <Link to="/race/statistics/teams" className={styles.viewAll}>
          Все команды →
        </Link>
      </div>

      <div className={styles.rankingList}>
        {teams.map((team, index) => (
          <TeamCard key={team.urlSlug} team={team} />
        ))}
      </div>
    </div>
  );
}

/**
 * Карточка команды в рейтинге
 */
function TeamCard({ team }) {
  const { name, shortName, urlSlug, logoUrls, rank } = team;

  return (
    <Link
      to={`/teams/${urlSlug}/members`}
      className={cn(styles.teamCard, styles[`place${rank}`])}
    >
      <div className={styles.placeBadge}>
        <span className={cn(styles.placeNumber, styles[`place${rank}`])}>{rank}</span>
      </div>

      <div className={styles.teamInfo}>
        <div className={styles.teamLogo}>
          {logoUrls?.original ? (
            <img src={logoUrls.original} alt={shortName || name} className={styles.logo} />
          ) : (
            <div className={styles.logoPlaceholder}>{shortName?.[0] || name?.[0]}</div>
          )}
        </div>

        <div className={styles.teamDetails}>
          <h3 className={styles.teamName}>{name}</h3>
          {/* {shortName && <div className={styles.teamShortName}>{shortName}</div>} */}
        </div>
        {/* 
        <div className={styles.teamRating}>
          <div className={styles.ratingLabel}>Рейтинг</div>
          <div className={styles.ratingValue}>{rank || '—'}</div>
        </div> */}
      </div>
    </Link>
  );
}
