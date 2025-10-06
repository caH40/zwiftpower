import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import SkeletonRidersDiagrams from '../../components/SkeletonLoading/SkeletonRidersDiagrams/SkeletonRidersDiagrams';
import { fetchRidersTotalRacingScore } from '../../redux/features/api/statistics-racing-score/fetchRidersTotalRacingScore';
import { resetRidersTotalRacingScore } from '../../redux/features/api/statistics-racing-score/ridersTotalRacingScoreSlice';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';
import ChartRidersTotalRacingScore from '../../components/Charts/RidersTotalRacingScore/RidersTotalRacingScore';

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
      <HelmetComponent {...STATISTICS_HELMET_PROPS.RACING_SCORE} />

      <h2 className={styles.title}>Распределение райдеров по Racing Score</h2>
      {/* скелетон для загрузки */}
      <SkeletonRidersDiagrams status={statusRidersTotalRacingScoreFetch} quantityCharts={4} />

      {statusRidersTotalRacingScoreFetch === 'resolved' && (
        <div className={styles.wrapper__charts}>
          <div className={styles.wrapper__chart}>
            <ChartRidersTotalRacingScore isMale={true} />
          </div>
          <div className={styles.wrapper__chart}>
            <ChartRidersTotalRacingScore isMale={false} />
          </div>
        </div>
      )}
    </section>
  );
}

export default RidersTotalRacingScore;
