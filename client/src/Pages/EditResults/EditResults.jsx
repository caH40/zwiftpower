import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRaceResultsEdit from '../../components/Tables/TableRaceResultsEdit/TableRaceResultsEdit';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { getTimerLocal } from '../../utils/date-local';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { resetSorting } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';

import styles from './EditResults.module.css';

function EditResults() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);
  useTitle('Модерация результатов заезда');

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilterCategory());
    dispatch(resetSorting());
    dispatch(fetchResultEvent(eventId));

    return () => dispatch(resetResults());
  }, [eventId, dispatch]);

  return (
    <div className={styles.wrapper}>
      {eventData?.id && (
        <>
          <h2 className={styles.title}>{eventData.name}</h2>
          <h3 className={styles.subtitle}>
            {getTimerLocal(eventData.eventStart, 'DDMMYYHm', true)}
          </h3>
          <NavBarResultsRace results={resultsPrepared} />

          <section className={styles.wrapper__wide}>
            <TableRaceResultsEdit results={resultsPrepared} event={eventData} />
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

export default EditResults;
