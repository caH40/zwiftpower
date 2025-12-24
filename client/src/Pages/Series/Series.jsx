import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import { HelmetSeries } from '../../components/Helmets/HelmetSeries';
import { fetchGetSeries } from '../../redux/features/api/series/fetchSeries';
import SeriesSection from '../../components/SeriesSection/SeriesSection';

import styles from './Series.module.css';

export default function Series() {
  const { seriesPublic } = useSelector((state) => state.seriesPublic);
  useTitle('Серии и Туры заездов');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeries());
  }, [dispatch]);

  return (
    <>
      <HelmetSeries />
      <section className={styles.wrapper}>
        <SeriesSection title="Текущие серии" series={seriesPublic?.ongoing || []} />
        <SeriesSection title="Анонсированные серии" series={seriesPublic?.upcoming || []} />
        <SeriesSection title="Завершенные серии" series={seriesPublic?.completed || []} />
      </section>
    </>
  );
}
