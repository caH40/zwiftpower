import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useResize } from '../../hook/use-resize';
import useTitle from '../../hook/useTitle';
import TableSeries from '../../components/Tables/TableSeries/TableResults';
import { fetchSeries } from '../../redux/features/api/seriesSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';
import { HelmetSeries } from '../../components/Helmets/HelmetSeries';
import { fetchGetSeries } from '../../redux/features/api/series/fetchSeries';
import { resetSeriesPublicAll } from '../../redux/features/api/series/seriesPublicSlice';
import CardSeries from '../../components/CardSeries/CardSeries';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './RaceSeries.module.css';

// рекламные блоки на странице
const adOverFooter = 5;
const adUnderHeader = 3;
const adNumbers = [adUnderHeader, adOverFooter];

function RaceSeries() {
  const { series, status: statusFetchSeries } = useSelector((state) => state.fetchSeries);

  const { seriesPublic, status: statusFetchSeriesOne } = useSelector(
    (state) => state.seriesPublic
  );
  useTitle('Серии и Туры заездов');
  const { isScreenLg: isDesktop } = useResize();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeries());
    dispatch(fetchGetSeries());

    return () => dispatch(resetSeriesPublicAll());
  }, [dispatch]);

  useAd(adNumbers);

  return (
    <>
      <HelmetSeries />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

        {/* скелетон загрузки */}
        <SkeletonTable status={statusFetchSeries} rows={1} />

        {!!series.length && statusFetchSeries === 'resolved' && <TableSeries series={series} />}

        <section className={styles.wrapper__cards}>
          {/* Карточки серий */}
          {!!seriesPublic?.length &&
            seriesPublic.map((elm) => (
              <CardSeries
                key={elm._id}
                name={elm.name}
                urlSlug={elm.urlSlug}
                posterUrls={elm.posterUrls}
                dateStart={elm.dateStart}
                dateEnd={elm.dateEnd}
              />
            ))}
        </section>
      </section>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default RaceSeries;
