import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';

import { HelmetRaceResults } from '../../components/Helmets/HelmetRaceResults';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { initialSorting } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';
import { raceTypes } from '../../assets/zwift/race-type';

import styles from './RaceResults.module.css';

function ResultsDescription() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);

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

  return (
    <div className={styles.wrapper}>
      <HelmetRaceResults
        eventId={eventId}
        image={eventData.imageUrl}
        clubName={eventData.clubName}
        name={eventData.name}
        eventStart={new Date(eventData.eventStart).toLocaleDateString()}
        typeRaceCustom={raceTypes.find((race) => race.value === eventData.typeRaceCustom)?.name}
      />
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
    </div>
  );
}

export default ResultsDescription;
