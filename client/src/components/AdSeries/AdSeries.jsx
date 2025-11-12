import { Link } from 'react-router-dom';

import { getTimerLocal } from '../../utils/date-local';
import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

import styles from './AdSeries.module.css';

/**
 * Рекламный блок серии заездов
 * @param {object} props - Пропсы.
 * @param {string} props.urlSlug - Уникальный slug рекламируемой серии заездов.
 * @param {'schedule' | 'results' | 'regulations'} props.pageType  - Под раздел Серии .
 * @param {boolean} props.isCard - Это карточка с минимальными размерами.
 */
export default function AdSeries({
  urlSlug,
  posterUrls,
  dateEnd,
  dateStart,
  name,
  isCard,
  pageType = 'schedule',
}) {
  return (
    <Link
      to={`/series/${urlSlug?.toLowerCase()}/${pageType}`}
      className={styles.wrapper}
      height={220}
    >
      (
      <div className={styles.wrapper__hover}>
        <AdaptiveImage
          className={styles.background}
          sources={posterUrls}
          isCard={isCard}
          height={220}
          width={1920}
        />

        <div className={styles.box__titles}>
          <h3 className={styles.title}>{name}</h3>
          <h4 className={styles.subtitle}>
            {`${getTimerLocal(dateStart)} - ${getTimerLocal(dateEnd)}`}
          </h4>
        </div>

        <div className={styles.description}>
          <h3>Расписание, результаты, регламент</h3>
        </div>
      </div>
      )
    </Link>
  );
}
