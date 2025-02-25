import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchGetSeriesOne } from '../../redux/features/api/series/fetchSeries';
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
  console.log({ seriesPublicOne });

  useTitle('Серия заездов ......');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOne({ urlSlug }));
  }, []);
  return <section className={styles.wrapper}>{urlSlug}</section>;
}
