import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchGetSeries } from '../../../redux/features/api/series/fetchSeries';
import { resetSeriesPublicAll } from '../../../redux/features/api/series/seriesPublicSlice';
import useTitle from '../../../hook/useTitle';
import CardSeries from '../../../components/CardSeries/CardSeries';

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
    <section className={styles.wrapper__cards}>
      {/* Карточки серий */}
      {!!seriesPublic?.length &&
        seriesPublic.map((elm) => (
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
  );
}
