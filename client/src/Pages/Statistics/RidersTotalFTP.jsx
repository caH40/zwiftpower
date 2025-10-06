import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChartRidersTotalFTP from '../../components/Charts/RidersTotal/RidersTotalFTP';
import useTitle from '../../hook/useTitle';
import { fetchRidersTotalFTP } from '../../redux/features/api/statistics-ftp/fetchRidersTotalFTP';
import { resetRidersTotalFTP } from '../../redux/features/api/statistics-ftp/ridersTotalFTPSlice';
import ChartRidersTotalFTPPie from '../../components/Charts/RidersTotalPie/ChartRidersTotalFTPPie';
import IconQuestion from '../../components/icons/IconQuestion';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';
import SkeletonRidersDiagrams from '../../components/SkeletonLoading/SkeletonRidersDiagrams/SkeletonRidersDiagrams';

import styles from './Statistics.module.css';

/**
 * Страница распределения райдеров по FTP
 */
function RidersTotalFTP() {
  useTitle('Статистика райдеров по FTP');
  const { status: statusRidersTotalFTPFetch } = useSelector(
    (state) => state.ridersTotalFTPFetch
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersTotalFTP());
    return () => dispatch(resetRidersTotalFTP());
  }, []);

  return (
    <section>
      <HelmetComponent {...STATISTICS_HELMET_PROPS.FTP} />
      <h2 className={styles.title}>
        Распределение райдеров по FTP{' '}
        <span>
          <IconQuestion
            squareSize={18}
            tooltip={
              'Категории рассчитываются по правилам с сайта zwiftpower.com, FTP рассчитывается как CP20 * 0.95 '
            }
          />
        </span>
      </h2>
      {/* скелетон для загрузки */}
      <SkeletonRidersDiagrams status={statusRidersTotalFTPFetch} quantityCharts={4} />

      {statusRidersTotalFTPFetch === 'resolved' && (
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

export default RidersTotalFTP;
