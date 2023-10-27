import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChartRidersTotalFTP from '../../components/Charts/RidersTotal/RidersTotalFTP';
import useTitle from '../../hook/useTitle';
import { fetchRidersTotalFTP } from '../../redux/features/api/statistics-ftp/fetchRidersTotalFTP';
import { resetRidersTotalFTP } from '../../redux/features/api/statistics-ftp/ridersTotalFTPSlice';
import IconQuestion from '../../components/icons/IconQuestion';

import styles from './Statistics.module.css';

/**
 * Страница распределения райдеров по FTP
 */
function RidersTotalFTP() {
  useTitle('Статистика');
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

      <ChartRidersTotalFTP isMale={true} />
      <ChartRidersTotalFTP isMale={false} />
    </section>
  );
}

export default RidersTotalFTP;
