import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetSeries } from '../../components/Helmets/HelmetSeries';
import { useResize } from '../../hook/use-resize';
import useTitle from '../../hook/useTitle';
import TableSeries from '../../components/Tables/TableSeries/TableResults';
import { fetchSeries } from '../../redux/features/api/seriesSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';

import styles from './RaceSeries.module.css';

// рекламные блоки на странице

const adUnderHeader = 3;
const adOne = 3; // одна реклама в блоке
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
      {isDesktop ? (
        <AdContainer number={adUnderHeader} maxHeight={150} marginBottom={10} />
      ) : null}
      <section className={styles.wrapper}>
        <HelmetSeries />
        {series[0] && (
          <>
            <TableSeries series={series} />
          </>
        )}
      </section>
      {isDesktop ? null : <AdContainer number={adOne} />}
    </>
  );
}

export default RaceSeries;
