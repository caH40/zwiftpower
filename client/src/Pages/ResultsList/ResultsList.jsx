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

import styles from './ResultsList.module.css';

// рекламные блоки на странице
const adOverFooter = 7;
const adUnderHeader = 11;
const adOne = 11; // одна реклама в блоке
const adNumbers = [adUnderHeader, adOverFooter];

function ResultsList() {
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { isScreenLg: isDesktop } = useResize();

  const initialDocsOnPage = localStorage.getItem('recordsOnPageResults') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const { eventsResults, quantityPages } = useSelector((state) => state.fetchEvents);

  useTitle('Результаты заездов Zwift');
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

  useAd(adNumbers);

  return (
    <>
      <HelmetResultsList />
      {isDesktop ? (
        <AdContainer number={adUnderHeader} maxHeight={180} marginBottom={10} />
      ) : null}
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
        {eventsResults[0] && (
          <>
            <section className={styles.wrapper__wide}>
              <TableResults
                events={eventsResults}
                updateResults={updateResults}
                removeEvent={removeEvent}
                updateEventAndSinged={updateEventAndSinged}
              />
            </section>
            {quantityPages > 1 && (
              <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
            )}
          </>
        )}
      </section>
      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1005} />
      ) : (
        <AdContainer number={adOne} />
      )}
    </>
  );
}

export default ResultsList;
