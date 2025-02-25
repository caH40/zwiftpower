import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';

import styles from './SeriesOneResults.module.css';
/**
 * Страница с результатами генеральных зачетов Серии заездов.
 */
export default function SeriesOneResults() {
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );

  useTitle(`Результаты ${seriesPublicOne?.name}` || 'Серия заездов');
  return seriesPublicOne && <div className={styles.wrapper}>В разработке...</div>;
}
