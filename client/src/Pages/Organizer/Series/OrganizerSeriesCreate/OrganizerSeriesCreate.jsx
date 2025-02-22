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
      <FormOrganizerSeriesCreate
        isCreating={true}
        organizerId={organizerId}
        series={initialData}
        eventsForSeries={eventsForSeries}
        loading={statusFetchEvents === 'loading'}
      />
    </section>
  );
}
