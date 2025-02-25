import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';

import styles from './SeriesOneSchedule.module.css';
/**
 * Страница с расписанием этапов Серии заездов.
 */
export default function SeriesOneSchedule() {
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );

  useTitle(`Этапы ${seriesPublicOne?.name}` || 'Серия заездов');
  return seriesPublicOne && <div className={styles.wrapper}>В разработке...</div>;
}
