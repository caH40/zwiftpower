import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import { createHtml } from '../../../utils/html';

import styles from './SeriesOneRegulations.module.css';

/**
 * Страница с Регламентами (описание, правила, призы) Серии заездов.
 */
export default function SeriesOneRegulations() {
  const { seriesPublicOne } = useSelector((state) => state.seriesPublic);

  useTitle(`Регламент ${seriesPublicOne?.name}` || 'Серия заездов');
  return (
    seriesPublicOne && (
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
    )
  );
}
