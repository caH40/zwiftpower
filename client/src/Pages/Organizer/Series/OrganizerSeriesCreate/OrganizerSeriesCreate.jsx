import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchEventsForSeries,
  resetEventsForSeries,
} from '../../../../redux/features/api/eventsSlice';
import FormOrganizerSeriesCreate from '../../../../components/UI/FormOrganizerSeriesCreate/FormOrganizerSeriesCreate';

import styles from './OrganizerSeriesCreate.module.css';

// Установочные данны при создании серии.
const initialData = {
  name: '',
  hasGeneral: true,
  hasTeams: true,
  isFinished: false,
  logoUrls: null,
  posterUrls: null,
  type: 'tour',
  mission: '',
  description: '',
  stages: [
    // {
    //   _id: '67b0cb7b26c9b687b7b0a334',
    //   eventStart: '2025-02-16T08:00:12.000+0000',
    //   name: 'ETALON team RACE',
    //   order: 1,
    // },
    // {
    //   _id: '67b0cbca26c9b687b7b0a4b4',
    //   eventStart: '2025-02-16T09:00:00.000+0000',
    //   name: 'ETALON team RACE',
    //   order: 2,
    // },
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
