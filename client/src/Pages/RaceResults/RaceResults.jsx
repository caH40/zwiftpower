import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { useResize } from '../../hook/use-resize';
// import { useAd } from '../../hook/useAd';
// import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import NavBarResultsRaceTable from '../../components/UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { resetSortColumnTable, setSortColumnTable } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';
import { HelmetRaceResults } from '../../components/Helmets/HelmetRaceResults';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { resetRaceResultsPage } from '../../redux/features/filterRaceResultsPageSlice';
import SkeletonDescEvent from '../../components/SkeletonLoading/SkeletonDescEvent/SkeletonDescEvent';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import AdSeries from '../../components/AdSeries/AdSeries';

import styles from './RaceResults.module.css';

// рекламные блоки на странице
// const adOverFooter = 8;
// const adUnderHeader = 13;
// const adNumbers = [adUnderHeader, adOverFooter];

function RaceResults() {
  const {
    eventData,
    resultsPrepared,
    status: statusFetchResults,
  } = useSelector((state) => state.fetchEventResult);
  const { column: pageCurrent } = useSelector((state) => state.filterRaceResultsPage.value);
  // const { isScreenLg: isDesktop } = useResize();

  useTitle('Результаты заезда');

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSortColumnTable({ columnName: 'Время', isRasing: true }));
    dispatch(fetchResultEvent(eventId));

    return () => {
      dispatch(resetFilterCategory());
      dispatch(resetResults());
      dispatch(resetRaceResultsPage());
      dispatch(resetSortColumnTable());
    };
  }, [eventId, dispatch]);

  useEffect(() => {
    if (['classicGroup', 'newbies'].includes(eventData.typeRaceCustom)) {
      dispatch(setSortColumnTable({ columnName: 'Категория', isRasing: true }));
    }
  }, [eventData, dispatch]);

  // useAd(adNumbers);

  return (
    <>
      <HelmetRaceResults
        eventId={eventId}
        image={eventData.imageUrl}
        name={eventData.name}
        eventStart={eventData.eventStart}
        organizer={eventData.organizer}
        typeRaceCustom={eventData.typeRaceCustom}
      />

      <section className={styles.wrapper}>
        {/* Скелетон загрузки для Постера */}
        <SkeletonDescEvent status={statusFetchResults} />

        {eventData?.id && statusFetchResults === 'resolved' && (
          <DescriptionEventZwift event={eventData} eventId={eventId} />
        )}

        {eventData?.seriesId?.urlSlug && (
          <div className={styles.wrapper__series}>
            <AdSeries urlSlug={eventData.seriesId?.urlSlug} pageType="results" />
          </div>
        )}

        <nav className={styles.block__nav}>
          {/* Переключение между страницами: Результаты и Сход */}
          <NavBarResultsRace />

          {/* Фильтры данных в таблице */}
          <NavBarResultsRaceTable results={resultsPrepared} hideDocsOnPage={true} />
        </nav>

        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={statusFetchResults} rows={20} height={40} />

        {pageCurrent === 'results' && !!resultsPrepared.length && (
          <>
            <section className={styles.wrapper__wide}>
              <TableRaceResults
                results={resultsPrepared.filter((result) => result.disqualification !== 'DNF')}
                event={eventData}
                status={statusFetchResults}
                docsOnPage={20}
              />
              <ServiceBox
                updated={eventData.updated}
                modifiedResults={eventData.modifiedResults}
              />
            </section>
          </>
        )}

        {/* страница для дисквалификации результатов */}

        {pageCurrent === 'dnf' && statusFetchResults === 'resolved' && (
          <>
            <section className={styles.wrapper__wide}>
              <TableRaceResults
                results={resultsPrepared.filter((result) => result.disqualification === 'DNF')}
                event={eventData}
                forDNF={true}
              />
              <ServiceBox
                updated={eventData.updated}
                modifiedResults={eventData.modifiedResults}
              />
            </section>
          </>
        )}
      </section>
      {/* {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )} */}
    </>
  );
}

export default RaceResults;
