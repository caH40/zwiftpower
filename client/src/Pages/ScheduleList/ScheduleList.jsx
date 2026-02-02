import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { createScheduleMenus } from '../../redux/features/popupTableScheduleSlice';
import useTitle from '../../hook/useTitle';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import Pagination from '../../components/UI/Pagination/Pagination';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { SCHEDULE_HELMET_PROPS } from '../../assets/helmet-props';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';
import { lsPrefixScheduleList } from '../../constants/localstorage';

import styles from './ScheduleList.module.css';

const notFound = 'К сожалению, заезды не найдены ... ((';

const localStorageFilterKey = `${lsPrefixScheduleList}filter`;
const localStoragePageSizeKey = `${lsPrefixScheduleList}pageSize`;

function ScheduleList() {
  const [page, setPage] = useState(1);

  const initialFilterTable = localStorage.getItem(localStorageFilterKey) || '';
  const [search, setSearch] = useState(initialFilterTable);

  const initialDocsOnPage = localStorage.getItem(localStoragePageSizeKey) || 20;

  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const [trigger, setTrigger] = useState(false);
  const {
    eventsSchedule,
    quantityPages,
    status: statusFetchEvents,
  } = useSelector((state) => state.fetchEvents);
  useTitle('Расписание заездов Zwift');
  const dispatch = useDispatch();

  // Запрос данных при изменении какого либо параметра.
  useEffect(() => {
    // Сохранение данных в локальном хранилище.
    localStorage.setItem(localStoragePageSizeKey, docsOnPage);
    localStorage.setItem(localStorageFilterKey, search);

    dispatch(fetchEvents({ started: false, page, docsOnPage, search }));
  }, [dispatch, trigger, page, docsOnPage, search]);

  useEffect(() => {
    dispatch(createScheduleMenus(eventsSchedule));
  }, [dispatch, eventsSchedule]);

  const updateEventAndSinged = (eventId) => {
    dispatch(fetchChangeEvent({ operation: 'put', eventId })).then((r) =>
      setTrigger((p) => !p)
    );
  };

  const removeEvent = (eventId, eventName) => {
    const question = `Вы действительно хотите удалить заезд "${eventName}"?`;
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

  return (
    <>
      <HelmetComponent {...SCHEDULE_HELMET_PROPS} />

      <section className={styles.wrapper}>
        <div className={styles.align__right}>
          {/* Блок фильтров для таблицы */}
          <FilterBoxForTable
            search={search}
            setSearch={setSearch}
            docsOnPage={docsOnPage}
            setDocsOnPage={setDocsOnPage}
            placeholder={'поиск'}
            setPage={setPage}
            showClearButton={true}
            localStorageFilterKey={localStorageFilterKey}
          />
        </div>

        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={statusFetchEvents} rows={10} height={30} />

        {eventsSchedule?.[0] && statusFetchEvents === 'resolved' && (
          <div className={styles.wrapper__wide}>
            <TableSchedule
              events={eventsSchedule}
              updateEvent={updateEventAndSinged}
              removeEvent={removeEvent}
              setTrigger={setTrigger}
            />
          </div>
        )}

        {quantityPages > 1 && (
          <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
        )}

        {!eventsSchedule?.[0] && statusFetchEvents === 'resolved' && (
          <div className={styles.title__notFound}>{notFound}</div>
        )}
      </section>
    </>
  );
}

export default ScheduleList;
