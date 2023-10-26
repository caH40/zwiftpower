import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChartRidersTotalFTP from '../../components/Charts/RidersTotal/RidersTotalFTP';
import useTitle from '../../hook/useTitle';
import { fetchRidersTotalFTP } from '../../redux/features/api/statistics-ftp/fetchRidersTotalFTP';
import { resetRidersTotalFTP } from '../../redux/features/api/statistics-ftp/ridersTotalFTPSlice';
import MyTooltip from '../../HOC/MyTooltip';

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
      <MyTooltip tooltip={'FTP = CP20 * 0.95'}>
        <h2 className={styles.title}>Распределение райдеров по FTP</h2>
      </MyTooltip>
      <ChartRidersTotalFTP isMale={true} />
      <ChartRidersTotalFTP isMale={false} />
    </section>
  );
}

export default RidersTotalFTP;
