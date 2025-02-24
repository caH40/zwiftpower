import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  fetchEventsForSeries,
  resetEventsForSeries,
} from '../../../../redux/features/api/eventsSlice';
import FormOrganizerSeriesCreate from '../../../../components/UI/FormOrganizerSeriesCreate/FormOrganizerSeriesCreate';
import { fetchGetOneSeriesOrganizer } from '../../../../redux/features/api/series/fetchSeries';

import styles from './OrganizerSeriesCurrentEdit.module.css';

/**
 * Страница редактирования Серии заездов.
 */
export default function OrganizerSeriesCurrentEdit() {
  const { seriesId } = useParams();
  const { seriesOne, status: statusFetchSeriesOne } = useSelector(
    (state) => state.seriesOrganizer
  );
  const { eventsForSeries, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );
  console.log(seriesOne);

  const dispatch = useDispatch();
  // Запрос на получение Эвентов Организатора.
  useEffect(() => {
    dispatch(fetchEventsForSeries());
    dispatch(fetchGetOneSeriesOrganizer({ seriesId }));

    return () => dispatch(resetEventsForSeries());
  }, [dispatch, seriesId]);

  // Успешный ответ от всех запросов данных.
  const isAllDataResolved =
    statusFetchEvents === 'resolved' && statusFetchSeriesOne === 'resolved' && seriesOne;

  return (
    <section className={styles.wrapper}>
      {isAllDataResolved && (
        <FormOrganizerSeriesCreate
          isCreating={false}
          seriesOne={seriesOne}
          eventsForSeries={eventsForSeries}
          loading={statusFetchEvents === 'loading'}
        />
      )}
    </section>
  );
}
