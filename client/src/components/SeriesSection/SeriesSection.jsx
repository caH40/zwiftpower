import { renderSkeletonCards } from '../../utils/skeleton-cards';
import CardSeries from '../CardSeries/CardSeries';
import { SkeletonCardSeries } from '../SkeletonLoading/SkeletonCardSeries/SkeletonCardSeries';
import TitleWithUnderline from '../TitleWithUnderline/TitleWithUnderline';

import styles from './SeriesSection.module.css';

export default function SeriesSection({ title, series = [], fetchSeriesStatus }) {
  return (
    <div className={styles.wrapper}>
      {fetchSeriesStatus !== 'loading' && series.length === 0 ? null : (
        <TitleWithUnderline tag="h2" size="xl">
          {title}
        </TitleWithUnderline>
      )}

      <section className={styles.wrapper__cards}>
        {!series.length
          ? renderSkeletonCards({
              count: 4,
              SkeletonComponent: SkeletonCardSeries,
              status: fetchSeriesStatus,
            })
          : null}

        {series.map((elm) => (
          <CardSeries
            key={elm._id}
            name={elm.name}
            urlSlug={elm.urlSlug}
            posterUrls={elm.posterUrls}
            dateStart={elm.dateStart}
            dateEnd={elm.dateEnd}
          />
        ))}
      </section>
    </div>
  );
}
