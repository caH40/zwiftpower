import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchGetSeriesOne } from '../../redux/features/api/series/fetchSeries';
import { getTimerLocal } from '../../utils/date-local';
import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';
import { resetSeriesPublicOne } from '../../redux/features/api/series/seriesPublicSlice';

import styles from './AdSeries.module.css';

/**
 * Рекламный блок серии заездов
 * @param {object} props - Пропсы.
 * @param {string} props.urlSlug - Уникальный slug рекламируемой серии заездов.
 * @param {'schedule' | 'results' | 'regulations'} props.pageType  - Под раздел Серии .
 * @param {boolean} props.isCard - Это карточка с минимальными размерами.
 */
export default function AdSeriesSolo({ urlSlug, isCard, pageType = 'schedule' }) {
  const { seriesPublicOne } = useSelector((state) => state.seriesPublic);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOne({ urlSlug }));

    return () => dispatch(resetSeriesPublicOne());
  }, [dispatch, urlSlug]);

  return (
    <Link
      to={`/series/${urlSlug?.toLowerCase()}/${pageType}`}
      className={styles.wrapper}
      height={220}
    >
      {seriesPublicOne && (
        <div className={styles.wrapper__hover}>
          <AdaptiveImage
            className={styles.background}
            sources={seriesPublicOne.posterUrls}
            isCard={isCard}
            height={220}
            width={1920}
          />

          <div className={styles.box__titles}>
            <h3 className={styles.title}>{seriesPublicOne.name}</h3>
            <h4 className={styles.subtitle}>
              {`${getTimerLocal(seriesPublicOne.dateStart)} - ${getTimerLocal(
                seriesPublicOne.dateEnd
              )}`}
            </h4>
          </div>

          <div className={styles.description}>
            <h3>Расписание, результаты, регламент</h3>
          </div>
        </div>
      )}
    </Link>
  );
}
