import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { createScheduleMenus } from '../../redux/features/popupTableScheduleSlice';
import Pagination from '../../components/UI/Pagination/Pagination';

import styles from './RaceScheduleList.module.css';

const notFound = 'К сожалению, заезды не найдены ... ((';

function RaceScheduleList() {
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const { eventsSchedule, quantityPages, status } = useSelector((state) => state.fetchEvents);

  useTitle('Расписание заездов');
  useBackground(false);
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

  return (
    <section>
      {eventsSchedule?.[0] && status === 'resolved' && (
        <TableSchedule
          events={eventsSchedule}
          updateEvent={updateEventAndSinged}
          removeEvent={removeEvent}
          setTrigger={setTrigger}
        />
      )}
      {quantityPages > 1 && (
        <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
      )}
      {!eventsSchedule?.[0] && status === 'resolved' && (
        <div className={styles.title__notFound}>{notFound}</div>
      )}
    </section>
  );
}

export default RaceScheduleList;
