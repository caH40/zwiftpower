import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useResize } from '../../hook/use-resize';
import useTitle from '../../hook/useTitle';
import TableSeries from '../../components/Tables/TableSeries/TableResults';
import { fetchSeries } from '../../redux/features/api/seriesSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';
import { HelmetSeries } from '../../components/Helmets/HelmetSeries';

import styles from './RaceSeries.module.css';

// рекламные блоки на странице
const adUnderHeader = 3;
const adNumbers = [adUnderHeader];

function RaceSeries() {
  const series = useSelector((state) => state.fetchSeries.series);
  useTitle('Серии и Туры заездов');
  const { isScreenLg: isDesktop } = useResize();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  useAd(adNumbers);

  return (
    <>
      <HelmetSeries />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}
        {series[0] && (
          <>
            <TableSeries series={series} />
          </>
        )}
      </section>
      {!isDesktop && <AdContainer number={adUnderHeader} />}
    </>
  );
}

export default RaceSeries;
