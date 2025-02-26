import { useSelector } from 'react-redux';

import { HelmetSeriesRegulations } from '../../../components/Helmets/HelmetSeriesRegulations';
import useTitle from '../../../hook/useTitle';
import { createHtml } from '../../../utils/html';
import { getTimerLocal } from '../../../utils/date-local';

import styles from './SeriesOneRegulations.module.css';

/**
 * Страница с Регламентами (описание, правила, призы) Серии заездов.
 */
export default function SeriesOneRegulations() {
  const { seriesPublicOne } = useSelector((state) => state.seriesPublic);

  useTitle(`Регламент ${seriesPublicOne?.name}` || 'Серия заездов');
  return (
    seriesPublicOne && (
      <>
        <HelmetSeriesRegulations
          urlSlug={seriesPublicOne.urlSlug}
          name={seriesPublicOne.name}
          imageSrc={seriesPublicOne.posterUrls?.medium}
          dateStart={getTimerLocal(seriesPublicOne.dateStart, 'DDMMYY')}
          dateEnd={getTimerLocal(seriesPublicOne.dateEnd, 'DDMMYY')}
          organizer={seriesPublicOne.organizer.name}
          description={seriesPublicOne.mission}
        />

        <div className={styles.wrapper}>
          {seriesPublicOne.description && (
            <section className={styles.content}>
              <h3 className={styles.title}>Описание</h3>
              <p
                className={styles.paragraph}
                dangerouslySetInnerHTML={{
                  __html: createHtml.description(seriesPublicOne.description),
                }}
              />
            </section>
          )}

          {seriesPublicOne.prizes && (
            <section className={styles.content}>
              <h3 className={styles.title}>Призы</h3>
              <p
                className={styles.paragraph}
                dangerouslySetInnerHTML={{
                  __html: createHtml.description(seriesPublicOne.prizes),
                }}
              />
            </section>
          )}

          {seriesPublicOne.rules && (
            <section className={styles.content}>
              <h3 className={styles.title}>Правила</h3>
              <p
                className={styles.paragraph}
                dangerouslySetInnerHTML={{
                  __html: createHtml.description(seriesPublicOne.rules),
                }}
              />
            </section>
          )}
        </div>
      </>
    )
  );
}
