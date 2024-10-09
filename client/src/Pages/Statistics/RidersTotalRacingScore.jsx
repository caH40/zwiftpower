import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChartRidersTotalFTP from '../../components/Charts/RidersTotal/RidersTotalFTP';
import useTitle from '../../hook/useTitle';
import ChartRidersTotalFTPPie from '../../components/Charts/RidersTotalPie/ChartRidersTotalFTPPie';
import { HelmetFTP } from '../../components/Helmets/HelmetFTP';
import SkeletonRidersDiagrams from '../../components/SkeletonLoading/SkeletonRidersDiagrams/SkeletonRidersDiagrams';
import { fetchRidersTotalRacingScore } from '../../redux/features/api/statistics-racing-score/fetchRidersTotalRacingScore';
import { resetRidersTotalRacingScore } from '../../redux/features/api/statistics-racing-score/ridersTotalRacingScoreSlice';

import styles from './Statistics.module.css';

/**
 * Страница распределения райдеров по Racing Score
 */
function RidersTotalRacingScore() {
  useTitle('Статистика райдеров по Racing Score');
  const { status: statusRidersTotalRacingScoreFetch } = useSelector(
    (state) => state.ridersTotalRacingScoreFetch
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersTotalRacingScore());
    return () => dispatch(resetRidersTotalRacingScore());
  }, []);

  return (
    <section>
      <HelmetFTP />
      <h2 className={styles.title}>Распределение райдеров по Racing Score</h2>
      {/* скелетон для загрузки */}
      <SkeletonRidersDiagrams status={statusRidersTotalRacingScoreFetch} quantityCharts={4} />

      {statusRidersTotalRacingScoreFetch === 'resolved' && (
        <>
          <div className={styles.wrapper__charts}>
            <div className={styles.wrapper__chart}>
              <ChartRidersTotalFTP isMale={true} />
            </div>
            <div className={styles.wrapper__chart}>
              <ChartRidersTotalFTP isMale={false} />
            </div>
          </div>
          <div className={styles.wrapper__charts}>
            <div className={styles.wrapper__chart}>
              <ChartRidersTotalFTPPie isMale={true} />
            </div>
            <div className={styles.wrapper__chart}>
              <ChartRidersTotalFTPPie isMale={false} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default RidersTotalRacingScore;
