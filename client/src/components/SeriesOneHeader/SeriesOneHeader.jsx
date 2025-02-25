import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

import styles from './SeriesOneHeader.module.css';

/**
 * Блок-шапка Серии заездов с описанием, итоговыми таблицами, этапами и результатами.
 */
export default function SeriesOneHeader({ posterUrls, name, mission }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.poster}>
        <div className={styles.poster__placeholder}></div>
        <AdaptiveImage sources={posterUrls} className={styles.poster__img} height={300} />

        {/* Блок с контентом */}
        <div className={styles.content}>
          {/* Блок с лого и названием Организатора */}
          <h3 className={styles.title}>{name}</h3>

          {mission && (
            <div className={styles.mission__box}>
              <p className={styles.mission}>{mission}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
