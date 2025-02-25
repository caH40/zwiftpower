import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';

import styles from './SeriesOneRegulations.module.css';

/**
 * Страница с Регламентами (описание, правила, призы) Серии заездов.
 */
export default function SeriesOneRegulations() {
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );

  useTitle(`Регламент ${seriesPublicOne?.name}` || 'Серия заездов');
  return seriesPublicOne && <div className={styles.wrapper}>В разработке...</div>;
}
