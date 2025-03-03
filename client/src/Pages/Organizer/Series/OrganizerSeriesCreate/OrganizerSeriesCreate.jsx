import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
  stages: [],
};

/**
 * Страница создания Серии заездов.
 */
export default function OrganizerSeriesCreate() {
  const dispatch = useDispatch();
  // Запрос на получение Эвентов Организатора.
  useEffect(() => {
    dispatch(fetchEventsForSeries());

    return () => dispatch(resetEventsForSeries());
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      <FormOrganizerSeriesCreate isCreating={true} seriesOne={initialData} />
    </section>
  );
}
