import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { getTimerLocal } from '../../utils/date-local';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent } from '../../redux/features/api/eventResultSlice';

import styles from './RaceResultsDescription.module.css';

function RaceResultsDescription() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);
  useTitle('Результаты заезда');
  useBackground(false);

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilterCategory());
    dispatch(fetchResultEvent(eventId));
  }, [eventId, dispatch]);

  return (
    <section className={styles.wrapper}>
      {eventData?.id && (
        <>
          <DescriptionEventZwiftNew event={eventData} />
          <NavBarResultsRace results={resultsPrepared} />

          <div className={styles.wrapper__wide}>
            <TableRaceResults results={resultsPrepared} event={eventData} />
            <div className={styles.right}>
              <span className={styles.service}>Обновлено:</span>
              <span className={styles.service}>
                {getTimerLocal(eventData.updated, 'DDMMYYHm')}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default RaceResultsDescription;
