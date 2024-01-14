import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetSeries } from '../../components/Helmets/HelmetSeries';
import useTitle from '../../hook/useTitle';
import TableSeries from '../../components/Tables/TableSeries/TableResults';
import { fetchSeries } from '../../redux/features/api/seriesSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';

import styles from './RaceSeries.module.css';

// рекламные блоки на странице
const adNumbers = [3];

function RaceSeries() {
  const series = useSelector((state) => state.fetchSeries.series);
  useTitle('Серии и Туры заездов');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  useAd(adNumbers);

  return (
    <>
      <section className={styles.wrapper}>
        <HelmetSeries />
        {series[0] && (
          <>
            <TableSeries series={series} />
          </>
        )}
      </section>
      <AdContainer number={3} />
    </>
  );
}

export default RaceSeries;
