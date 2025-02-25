import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { fetchGetSeriesOne } from '../../redux/features/api/series/fetchSeries';
import SeriesOneHeader from '../../components/SeriesOneHeader/SeriesOneHeader';
import NavBarSeriesPublic from '../../components/UI/NavBarSeriesPublic/NavBarSeriesPublic';
import useTitle from '../../hook/useTitle';

import styles from './SeriesOne.module.css';

/**
 * Страница Серии заездов. Описание, итоговые таблицы.
 */
export default function SeriesOne() {
  const { urlSlug } = useParams();
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );
  console.log(seriesPublicOne);

  useTitle(seriesPublicOne?.name || 'Серия заездов');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOne({ urlSlug }));
  }, []);
  return (
    statusPublicOne === 'resolved' &&
    statusPublicOne && (
      <section className={styles.wrapper}>
        <SeriesOneHeader
          posterUrls={seriesPublicOne.posterUrls}
          logoUrls={seriesPublicOne.logoUrls}
          name={seriesPublicOne.name}
          mission={seriesPublicOne.mission}
        />

        {/* Кнопки навигации по страницам Серии заездов */}
        <div className={styles.box__navbar}>
          <NavBarSeriesPublic urlSlug={seriesPublicOne.urlSlug} />
        </div>

        <Outlet />
      </section>
    )
  );
}
