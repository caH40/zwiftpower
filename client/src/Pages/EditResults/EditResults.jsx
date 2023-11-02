import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRaceResultsEdit from '../../components/Tables/TableRaceResultsEdit/TableRaceResultsEdit';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { getTimerLocal } from '../../utils/date-local';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent } from '../../redux/features/api/eventResultSlice';
import { resetSorting } from '../../redux/features/sortTableSlice';

import styles from './EditResults.module.css';

function EditResults() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);
  useTitle('Модификация результатов заезда');

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilterCategory());
    dispatch(resetSorting());
    dispatch(fetchResultEvent(eventId));
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
            <div className={styles.right}>
              <span className={styles.service}>Обновлено:</span>
              <span className={styles.service}>
                {getTimerLocal(eventData.updated, 'DDMMYYHm')}
              </span>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default EditResults;
