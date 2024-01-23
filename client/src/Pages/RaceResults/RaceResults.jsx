import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useResize } from '../../hook/use-resize';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { initialSorting } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';
import { HelmetRaceResults } from '../../components/Helmets/HelmetRaceResults';

import styles from './RaceResults.module.css';

// рекламные блоки на странице
const adOverFooter = 8;
const adUnderHeader = 13;
const adNumbers = [adOverFooter, adUnderHeader];

function RaceResults() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);
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
        {isDesktop ? (
          <AdContainer number={adUnderHeader} maxHeight={180} marginBottom={10} />
        ) : null}
        {eventData?.id && (
          <>
            <DescriptionEventZwiftNew event={eventData} eventId={eventId} />
            <NavBarResultsRace results={resultsPrepared} />

            <section className={styles.wrapper__wide}>
              <TableRaceResults results={resultsPrepared} event={eventData} />
              <ServiceBox
                updated={eventData.updated}
                modifiedResults={eventData.modifiedResults}
              />
            </section>
          </>
        )}
      </section>
      <AdContainer number={adOverFooter} />
    </>
  );
}

export default RaceResults;
