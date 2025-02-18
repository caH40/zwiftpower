import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';

import { useResize } from '../../hook/use-resize';
import AdContainer from '../../components/AdContainer/AdContainer';
import { getAlert } from '../../redux/features/alertMessageSlice';
import TableResults from '../../components/Tables/TableResults/TableResults';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { fetchUpdateResult } from '../../redux/features/api/resultsUpdateSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { createResultListMenus } from '../../redux/features/popupTableResultsListSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';
import { useAd } from '../../hook/useAd';
import { HelmetResultsList } from '../../components/Helmets/HelmetResultsList';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './ResultsList.module.css';

// рекламные блоки на странице
const adOverFooter = 7;
const adUnderHeader = 11;
const adNumbers = [adUnderHeader, adOverFooter];

const storageNameForRecords = 'recordsOnPageResults';
const storageNameForFilter = 'filterOnPageScheduleList';

function ResultsListPage() {
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);

  const initialFilterTable = localStorage.getItem(storageNameForFilter) || '';
  const [search, setSearch] = useState(initialFilterTable);

  const { isScreenLg: isDesktop } = useResize();

  const initialDocsOnPage = localStorage.getItem(storageNameForRecords) || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const {
    eventsResults,
    quantityPages,
    status: statusFetchEvents,
  } = useSelector((state) => state.fetchEvents);

  useTitle('Результаты заездов Zwift');
  const dispatch = useDispatch();

  // Запрос данных при изменении какого либо параметра.
  useEffect(() => {
    localStorage.setItem(storageNameForRecords, docsOnPage);
    localStorage.setItem(storageNameForFilter, search);
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

  useAd(adNumbers);

  return (
    <>
      <HelmetResultsList />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}
        <div className={styles.align__right}>
          {/* Блок фильтров для таблицы */}
          <FilterBoxForTable
            search={search}
            setSearch={setSearch}
            docsOnPage={docsOnPage}
            setDocsOnPage={setDocsOnPage}
            placeholder={'поиск'}
            setPage={setPage}
            hasClearButton={true}
            localStorageKey={storageNameForFilter}
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
      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default ResultsListPage;
