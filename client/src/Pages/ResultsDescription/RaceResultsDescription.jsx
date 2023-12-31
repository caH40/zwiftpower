import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';

import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { initialSorting } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';

import styles from './ResultsDescription.module.css';

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

  return (
    <div className={styles.wrapper}>
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
