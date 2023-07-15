import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import { getAlert } from '../../redux/features/alertMessageSlice';
import TableResults from '../../components/Tables/TableResults/TableResults';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { fetchUpdateResult } from '../../redux/features/api/resultsUpdateSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { createResultListMenus } from '../../redux/features/popupTableResultsListSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterResultsList from '../../components/UI/FilterResultsList/FilterResultsList';

import styles from './RaceResultsList.module.css';

function RaceResultsList() {
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);

  const initialDocsOnPage = localStorage.getItem('recordsOnPageResults') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const { eventsResults, quantityPages } = useSelector((state) => state.fetchEvents);

  useTitle('Результаты заездов');
  useBackground(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents({ started: true, page, docsOnPage }));
  }, [dispatch, trigger, page, docsOnPage]);

  // создание массива с меню модерации эвентов в таблице
  useEffect(() => {
    dispatch(createResultListMenus(eventsResults));
  }, [dispatch, eventsResults]);

  const updateResults = (eventId) => {
    dispatch(fetchUpdateResult(eventId)).then((r) => setTrigger((p) => !p));
  };

  const removeEvent = (eventId, eventName) => {
    const question = `Вы действительно хотите удалить заезд "${eventName}"? Будет удалён заезд и все результаты заезда!`;
    const isConfirmed = window.confirm(question);
    if (!isConfirmed) {
      dispatch(
        getAlert({
          message: `Отмена удаления заезда ${eventName}`,
          type: 'warning',
          isOpened: true,
        })
      );
      return;
    }

    dispatch(fetchChangeEvent({ operation: 'delete', eventId })).then((r) =>
      setTrigger((p) => !p)
    );
  };

  const updateEventAndSinged = (eventId) => {
    dispatch(fetchChangeEvent({ operation: 'put', eventId })).then((r) =>
      setTrigger((p) => !p)
    );
  };

  return (
    <section>
      {eventsResults[0] && (
        <>
          <div className={styles.align__right}>
            <FilterResultsList docsOnPage={docsOnPage} setDocsOnPage={setDocsOnPage} />
          </div>
          <TableResults
            events={eventsResults}
            updateResults={updateResults}
            removeEvent={removeEvent}
            updateEventAndSinged={updateEventAndSinged}
          />
          {quantityPages > 1 && (
            <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
          )}
        </>
      )}
    </section>
  );
}

export default RaceResultsList;
