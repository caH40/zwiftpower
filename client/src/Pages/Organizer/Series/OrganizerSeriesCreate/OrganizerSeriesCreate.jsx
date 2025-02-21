import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEvents, resetEventsSchedule } from '../../../../redux/features/api/eventsSlice';
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
  const { eventsSchedule, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );

  console.log(eventsSchedule);

  const dispatch = useDispatch();
  // Запрос на получение Эвентов Организатора.
  useEffect(() => {
    dispatch(fetchEvents({ started: false, organizerId }));

    return () => dispatch(resetEventsSchedule());
  }, [dispatch, organizerId]);
  return (
    <section className={styles.wrapper}>
      <FormOrganizerSeriesCreate
        isCreating={true}
        organizerId={organizerId}
        series={initialData}
      />
    </section>
  );
}
