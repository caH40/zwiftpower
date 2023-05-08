import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { getLocalDate } from '../../utils/date-convert';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchEvent } from '../../redux/features/api/eventSlice';
import LoaderZ from '../../components/LoaderZ/LoaderZ';

import styles from './RaceResultsDescription.module.css';

function RaceResultsDescription() {
  const { eventData, resultsPrepared, status } = useSelector((state) => state.fetchEvent);
  useTitle('Результаты заезда');
  useBackground(false);

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilterCategory());
    dispatch(fetchEvent(eventId));
  }, [eventId, dispatch]);

  return (
    <section>
      {eventData?.id && (
        <>
          <DescriptionEventZwift event={eventData} />
          <NavBarResultsRace results={resultsPrepared} />
          <TableRaceResults results={resultsPrepared} />

          <div className={styles.right}>
            <span className={styles.service}>Обновлено:</span>
            <span className={styles.service}>{getLocalDate(eventData.updated, 'short')}</span>
          </div>
        </>
      )}
      {status === 'loading' && <LoaderZ />}
    </section>
  );
}

export default RaceResultsDescription;
