import styles from './MemberStatistics.module.css';

/**
 * Параметры райдера.
 * @param {Object} props - Пропсы.
 * @param {{gold: number; silver: number;bronze: number;}} props.medals - Объект медалей.
 * @param {number | 'н/д'} props.racingScore - Рейтинговые очки.
 */
export default function MemberStatistics({ racingScore, medals }) {
  return (
    <>
      {/* Блок рейтинговых очков */}
      <div className={styles.scoreContainer}>
        <span className={styles.scoreLabel}>Racing Score</span>
        <span className={styles.scoreValue}>{racingScore}</span>
      </div>

      {/* Блок медалей */}
      <div className={styles.medalsContainer}>
        <div className={styles.medalContainer}>
          <div className={styles.gold} />
          <span className={styles.medals}>{medals.gold}</span>
        </div>

        <div className={styles.medalContainer}>
          <div className={styles.silver} />
          <span className={styles.medals}>{medals.silver}</span>
        </div>

        <div className={styles.medalContainer}>
          <div className={styles.bronze} />
          <span className={styles.medals}>{medals.bronze}</span>
        </div>
      </div>
    </>
  );
}
