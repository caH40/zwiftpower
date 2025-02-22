import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchEventsForSeries,
  resetEventsForSeries,
} from '../../../../redux/features/api/eventsSlice';
import FormOrganizerSeriesCreate from '../../../../components/UI/FormOrganizerSeriesCreate/FormOrganizerSeriesCreate';

import styles from './OrganizerSeriesCreate.module.css';

const initialData = {
  name: '',
  logoUrls: null,
  posterUrls: null,
  mission: '',
  description: '',
  stages: [
    {
      _id: '67b0cb7b26c9b687b7b0a334',
      eventStart: '2025-02-16T08:00:12.000+0000',
      name: 'ETALON team RACE',
    },
    {
      _id: '67b0cbca26c9b687b7b0a4b4',
      eventStart: '2025-02-16T09:00:00.000+0000',
      name: 'ETALON team RACE',
    },
  ],
};

/**
 * Страница создания Серии заездов.
 */
export default function OrganizerSeriesCreate({ organizerId }) {
  const { eventsForSeries, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );

  const dispatch = useDispatch();
  // Запрос на получение Эвентов Организатора.
  useEffect(() => {
    dispatch(fetchEventsForSeries());

    return () => dispatch(resetEventsForSeries());
  }, [dispatch, organizerId]);
  return (
    <section className={styles.wrapper}>
      {/* !!!!!!!!!!Добавить условие загрузки данных серии */}
      {statusFetchEvents === 'resolved' && (
        <FormOrganizerSeriesCreate
          isCreating={true}
          organizerId={organizerId}
          series={initialData}
          eventsForSeries={eventsForSeries}
          loading={statusFetchEvents === 'loading'}
        />
      )}
    </section>
  );
}
