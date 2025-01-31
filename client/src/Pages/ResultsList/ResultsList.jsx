import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAlert } from '../../redux/features/alertMessageSlice';
import TableResults from '../../components/Tables/TableResults/TableResults';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { fetchUpdateResult } from '../../redux/features/api/resultsUpdateSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { createResultListMenus } from '../../redux/features/popupTableResultsListSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';

import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './ResultsList.module.css';

function ResultsList() {
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const initialDocsOnPage = localStorage.getItem('recordsOnPageResults') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const {
    eventsResults,
    quantityPages,
    status: statusFetchEvents,
  } = useSelector((state) => state.fetchEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('recordsOnPageResults', docsOnPage);
    dispatch(fetchEvents({ started: true, page, docsOnPage, search }));
  }, [dispatch, trigger, page, docsOnPage, search]);

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
    <>
      <section className={styles.wrapper}>
        <div className={styles.align__right}>
          <FilterBoxForTable
            search={search}
            setSearch={setSearch}
            docsOnPage={docsOnPage}
            setDocsOnPage={setDocsOnPage}
            placeholder={'поиск по названию'}
            setPage={setPage}
          />
        </div>

        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={statusFetchEvents} rows={+docsOnPage} height={30} />

        {!!eventsResults.length && statusFetchEvents === 'resolved' && (
          <section className={styles.wrapper__wide}>
            <TableResults
              events={eventsResults}
              updateResults={updateResults}
              removeEvent={removeEvent}
              updateEventAndSinged={updateEventAndSinged}
              docsOnPage={docsOnPage}
              status={statusFetchEvents}
            />
          </section>
        )}
        {quantityPages > 1 && (
          <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
        )}
      </section>
    </>
  );
}

// export default ResultsList;
