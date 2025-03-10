import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useResize } from '../../hook/use-resize';
import useTitle from '../../hook/useTitle';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';
import { HelmetSeries } from '../../components/Helmets/HelmetSeries';
import { fetchGetSeries } from '../../redux/features/api/series/fetchSeries';
import { resetSeriesPublicAll } from '../../redux/features/api/series/seriesPublicSlice';
import SeriesSection from '../../components/SeriesSection/SeriesSection';

import styles from './Series.module.css';

// рекламные блоки на странице
const adOverFooter = 25;
const adUnderHeader = 26;
const adNumbers = [adUnderHeader, adOverFooter];

export default function Series() {
  const { seriesPublic } = useSelector((state) => state.seriesPublic);
  useTitle('Серии и Туры заездов');
  const { isScreenLg: isDesktop } = useResize();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeries());

    return () => dispatch(resetSeriesPublicAll());
  }, [dispatch]);

  useAd(adNumbers);

  return (
    <>
      <HelmetSeries />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

        <SeriesSection title="Текущие серии" series={seriesPublic?.ongoing || []} />
        <SeriesSection title="Анонсированные серии" series={seriesPublic?.upcoming || []} />
        <SeriesSection title="Завершенные серии" series={seriesPublic?.completed || []} />
      </section>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}
