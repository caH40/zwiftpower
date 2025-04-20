import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import { fetchGetSeriesOne } from '../../redux/features/api/series/fetchSeries';
import SeriesOneHeader from '../../components/SeriesOneHeader/SeriesOneHeader';
import NavBarSeriesPublic from '../../components/UI/NavBarSeriesPublic/NavBarSeriesPublic';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';
import { useSeriesOneFunctions } from '../../hook/useSeriesOneFunctions';

import styles from './SeriesOneLayout.module.css';

// рекламные блоки на странице
const adOverFooter = 25;
const adUnderHeader = 26;
const adNumbers = [adUnderHeader, adOverFooter];

/**
 * Макетная страница Серии заездов для вложенных страниц. Описание, итоговые таблицы.
 */
export default function SeriesOneLayout() {
  const { urlSlug } = useParams();
  const { isScreenLg: isDesktop } = useResize();
  const { seriesPublicOne } = useSelector((state) => state.seriesPublic);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOne({ urlSlug }));
  }, []);

  // Функция updateStageResults обновляет результаты этапа (order) серии заездов (seriesId).
  const { updateStageResults, updateGeneralClassification } = useSeriesOneFunctions();

  useAd(adNumbers);
  return (
    <>
      {/* {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />} */}

      <section className={styles.wrapper}>
        {seriesPublicOne && (
          <SeriesOneHeader
            posterUrls={seriesPublicOne.posterUrls}
            logoUrls={seriesPublicOne.logoUrls}
            seriesId={seriesPublicOne._id}
            name={seriesPublicOne.name}
            mission={seriesPublicOne.mission}
            updateStageResults={updateStageResults}
            updateGeneralClassification={updateGeneralClassification}
            stages={seriesPublicOne.stages.map((stage) => ({ stageOrder: stage.order }))}
            // FIXME: не отображать иконку управления для не редактируемых серий
            showEditIcon={!['catchUp', 'series'].includes(seriesPublicOne.type)}
            organizerId={seriesPublicOne.organizer._id}
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
