import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChartRidersTotalFTP from '../../components/Charts/RidersTotal/RidersTotalFTP';
import useTitle from '../../hook/useTitle';
import { fetchRidersTotalFTP } from '../../redux/features/api/statistics-ftp/fetchRidersTotalFTP';
import { resetRidersTotalFTP } from '../../redux/features/api/statistics-ftp/ridersTotalFTPSlice';
import ChartRidersTotalFTPPie from '../../components/Charts/RidersTotalPie/ChartRidersTotalFTPPie';
import IconQuestion from '../../components/icons/IconQuestion';

import styles from './Statistics.module.css';

/**
 * Страница распределения райдеров по FTP
 */
function RidersTotalFTP() {
  useTitle('Статистика райдеров по FTP');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersTotalFTP());
    return () => dispatch(resetRidersTotalFTP());
  }, []);

  return (
    <section>
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
    </section>
  );
}

export default RidersTotalFTP;
