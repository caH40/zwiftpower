import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import { fetchGetSeriesOne } from '../../redux/features/api/series/fetchSeries';
import SeriesOneHeader from '../../components/SeriesOneHeader/SeriesOneHeader';
import NavBarSeriesPublic from '../../components/UI/NavBarSeriesPublic/NavBarSeriesPublic';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';

import styles from './SeriesOneLayout.module.css';

// рекламные блоки на странице
const adOverFooter = 26;
const adUnderHeader = 25;
const adNumbers = [adUnderHeader, adOverFooter];

/**
 * Страница Серии заездов. Описание, итоговые таблицы.
 */
export default function SeriesOneLayout() {
  const { urlSlug } = useParams();
  const { isScreenLg: isDesktop } = useResize();
  const { seriesPublicOne, status: statusPublicOne } = useSelector(
    (state) => state.seriesPublic
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOne({ urlSlug }));
  }, []);

  useAd(adNumbers);
  return (
    <>
      {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

      <section className={styles.wrapper}>
        {statusPublicOne === 'resolved' && statusPublicOne && (
          <SeriesOneHeader
            posterUrls={seriesPublicOne?.posterUrls}
            logoUrls={seriesPublicOne?.logoUrls}
            name={seriesPublicOne?.name}
            mission={seriesPublicOne?.mission}
          />
        )}

        {/* Кнопки навигации по страницам Серии заездов */}
        <div className={styles.box__navbar}>
          <NavBarSeriesPublic urlSlug={seriesPublicOne?.urlSlug} />
        </div>

        <Outlet />
      </section>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}
