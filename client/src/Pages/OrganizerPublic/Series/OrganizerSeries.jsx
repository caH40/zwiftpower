import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchGetSeries } from '../../../redux/features/api/series/fetchSeries';
import { resetSeriesPublicAll } from '../../../redux/features/api/series/seriesPublicSlice';
import { HelmetOrganizerPublic } from '../../../components/Helmets/HelmetOrganizerPublic';
import useTitle from '../../../hook/useTitle';
import SeriesSection from '../../../components/SeriesSection/SeriesSection';

import styles from './OrganizerSeries.module.css';

/**
 * Страница Серий заездов организатора.
 */
export default function OrganizerSeries() {
  const { urlSlug } = useParams();
  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);
  const { seriesPublic } = useSelector((state) => state.seriesPublic);

  useTitle(organizer?.name && `Серии заездов от ${organizer?.name}`);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeries(urlSlug));

    return () => dispatch(resetSeriesPublicAll());
  }, [dispatch]);
  return (
    <section className={styles.wrapper_}>
      <HelmetOrganizerPublic
        urlSlug={organizer.urlSlug}
        name={organizer.name}
        imageSrc={organizer.posterUrls?.large}
        pageType="series"
      />

      <SeriesSection title="Текущие серии" series={seriesPublic?.ongoing || []} />
      <SeriesSection title="Анонсированные серии" series={seriesPublic?.upcoming || []} />
      <SeriesSection title="Завершенные серии" series={seriesPublic?.completed || []} />
    </section>
  );
}
