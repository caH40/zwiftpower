import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useResize } from '../../hook/use-resize';
import useTitle from '../../hook/useTitle';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { createScheduleMenus } from '../../redux/features/popupTableScheduleSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import { HelmetSchedule } from '../../components/Helmets/HelmetSchedule';

import styles from './ScheduleList.module.css';

const notFound = 'К сожалению, заезды не найдены ... ((';

// рекламные блоки на странице
const adOverFooter = 5;
const adUnderHeader = 10;
const adNumbers = [adUnderHeader, adOverFooter];

function ScheduleList() {
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const { eventsSchedule, quantityPages, status } = useSelector((state) => state.fetchEvents);
  const { isScreenLg: isDesktop } = useResize();
  useTitle('Расписание заездов Zwift');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents({ started: false, page, docsOnPage: 20 }));
  }, [dispatch, trigger, page]);

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

  useAd(adNumbers);

  return (
    <>
      <HelmetSchedule />
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}
        {eventsSchedule?.[0] && status === 'resolved' && (
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
        {!eventsSchedule?.[0] && status === 'resolved' && (
          <div className={styles.title__notFound}>{notFound}</div>
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

export default ScheduleList;
