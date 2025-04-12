import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import {
  fetchGetSeriesOne,
  fetchGetStageResults,
  fetchPutStageResults,
} from '../../redux/features/api/series/fetchSeries';
import SeriesOneHeader from '../../components/SeriesOneHeader/SeriesOneHeader';
import NavBarSeriesPublic from '../../components/UI/NavBarSeriesPublic/NavBarSeriesPublic';
import AdContainer from '../../components/AdContainer/AdContainer';
import { useAd } from '../../hook/useAd';
import { getAlert } from '../../redux/features/alertMessageSlice';

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

  // Функция обновления результатов этапа (order) серии заездов (seriesId).
  const updateStageResults = async ({ seriesId, stageOrder }) => {
    try {
      const isConfirm = window.confirm(
        `При обновлении результатов этапа №${stageOrder} сбросятся все изменения, внесённые в финишный протокол модераторами Серии. Вы действительно хотите обновить результаты этапа?`
      );

      if (!isConfirm) {
        dispatch(
          getAlert({
            message: `Отменена операция обновления результатов этапа №${stageOrder}`,
            type: 'warning',
            isOpened: true,
          })
        );
        return;
      }

      await dispatch(fetchPutStageResults({ seriesId, stageOrder })).unwrap();

      // После ответа fetchPutStageResults выполняется обновление результатов для соответствующего этапа.
      dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
    } catch (error) {
      dispatch(
        getAlert({
          message: error,
          type: 'error',
          isOpened: true,
        })
      );
    }
  };

  useAd(adNumbers);
  return (
    <>
      {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

      <section className={styles.wrapper}>
        {seriesPublicOne && (
          <SeriesOneHeader
            posterUrls={seriesPublicOne.posterUrls}
            logoUrls={seriesPublicOne.logoUrls}
            seriesId={seriesPublicOne._id}
            name={seriesPublicOne.name}
            mission={seriesPublicOne.mission}
            updateStageResults={updateStageResults}
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
