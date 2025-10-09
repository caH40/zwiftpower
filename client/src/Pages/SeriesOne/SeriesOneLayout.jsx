import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

// import { useResize } from '../../hook/use-resize';
import { fetchGetSeriesOne } from '../../redux/features/api/series/fetchSeries';
import SeriesOneHeader from '../../components/SeriesOneHeader/SeriesOneHeader';
import NavBarSeriesPublic from '../../components/UI/NavBarSeriesPublic/NavBarSeriesPublic';
import { resetSeriesPublicOne } from '../../redux/features/api/series/seriesPublicSlice';
import SkeletonSeriesHeader from '../../components/SkeletonLoading/SkeletonSeriesHeader/SkeletonSeriesHeader';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
// import { useAd } from '../../hook/useAd';
// import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './SeriesOneLayout.module.css';

// рекламные блоки на странице
// const adOverFooter = 25;
// const adUnderHeader = 26;
// const adNumbers = [adUnderHeader, adOverFooter];

/**
 * Макетная страница Серии заездов для вложенных страниц. Описание, итоговые таблицы.
 */
export default function SeriesOneLayout() {
  const { urlSlug, stageOrder: currentStageOrder } = useParams();

  // const { isScreenLg: isDesktop } = useResize();
  const { status: fetchSeriesStatus, seriesPublicOne } = useSelector(
    (state) => state.seriesPublic
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOne({ urlSlug }));

    return () => dispatch(resetSeriesPublicOne());
  }, []);

  // useAd(adNumbers);
  return (
    <>
      <section className={styles.wrapper}>
        {seriesPublicOne ? (
          <SeriesOneHeader
            posterUrls={seriesPublicOne.posterUrls}
            logoUrls={seriesPublicOne.logoUrls}
            seriesId={seriesPublicOne._id}
            name={seriesPublicOne.name}
            mission={seriesPublicOne.mission}
            urlSlug={seriesPublicOne.urlSlug}
            stages={seriesPublicOne.stages.map((stage) => ({ stageOrder: stage.order }))}
            // FIXME: не отображать иконку управления для не редактируемых серий
            showEditIcon={!['catchUp', 'series'].includes(seriesPublicOne.type)}
            organizerId={seriesPublicOne.organizer._id}
            dateStart={seriesPublicOne.dateStart}
            dateEnd={seriesPublicOne.dateEnd}
            type={seriesPublicOne.type}
            currentStageOrder={currentStageOrder}
          />
        ) : (
          renderSkeletonCards({
            count: 1,
            SkeletonComponent: SkeletonSeriesHeader,
            status: fetchSeriesStatus,
          })
        )}

        {/* Кнопки навигации по страницам Серии заездов */}
        <div className={styles.box__navbar}>
          <NavBarSeriesPublic urlSlug={seriesPublicOne?.urlSlug} />
        </div>

        <Suspense>
          <Outlet />
        </Suspense>
      </section>

      {/* {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )} */}
    </>
  );
}
