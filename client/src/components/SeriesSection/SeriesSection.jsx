import CardSeries from '../CardSeries/CardSeries';
import TitleWithUnderline from '../TitleWithUnderline/TitleWithUnderline';

import styles from './SeriesSection.module.css';

export default function SeriesSection({ title, series }) {
  return (
    !!series.length && (
      <>
        <TitleWithUnderline tag="h2" size="xl">
          {title}
        </TitleWithUnderline>
        <section className={styles.wrapper__cards}>
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
      </>
    )
  );
}
