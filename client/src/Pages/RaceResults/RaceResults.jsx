import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useResize } from '../../hook/use-resize';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import NavBarResultsRaceTable from '../../components/UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { initialSorting } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';
import { HelmetRaceResults } from '../../components/Helmets/HelmetRaceResults';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { resetRaceResultsPage } from '../../redux/features/filterRaceResultsPageSlice';

import styles from './RaceResults.module.css';

// рекламные блоки на странице
const adOverFooter = 8;
const adUnderHeader = 13;
const adNumbers = [adUnderHeader, adOverFooter];

function RaceResults() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);
  const { column: pageCurrent } = useSelector((state) => state.filterRaceResultsPage.value);
  const { isScreenLg: isDesktop } = useResize();

  useTitle('Результаты заезда');

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialSorting({ columnName: 'Время', isRasing: true }));
    dispatch(fetchResultEvent(eventId));

    return () => {
      dispatch(resetFilterCategory());
      dispatch(resetResults());
      dispatch(resetRaceResultsPage());
    };
  }, [eventId, dispatch]);

  useEffect(() => {
    if (eventData.typeRaceCustom === 'classicGroup') {
      dispatch(initialSorting({ columnName: 'Категория', isRasing: true }));
    }
  }, [eventData]);

  useAd(adNumbers);

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
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}
        {eventData?.id && (
          <>
            <DescriptionEventZwift event={eventData} eventId={eventId} />
            <nav className={styles.block__nav}>
              <NavBarResultsRace />

              <NavBarResultsRaceTable results={resultsPrepared} />
            </nav>
            {pageCurrent === 'results' && (
              <>
                <section className={styles.wrapper__wide}>
                  <TableRaceResults
                    results={resultsPrepared.filter(
                      (result) => result.disqualification !== 'DNF'
                    )}
                    event={eventData}
                  />
                  <ServiceBox
                    updated={eventData.updated}
                    modifiedResults={eventData.modifiedResults}
                  />
                </section>
              </>
            )}
            {pageCurrent === 'dnf' && (
              <>
                <section className={styles.wrapper__wide}>
                  <TableRaceResults
                    results={resultsPrepared.filter(
                      (result) => result.disqualification === 'DNF'
                    )}
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
          </>
        )}
      </section>
      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default RaceResults;
