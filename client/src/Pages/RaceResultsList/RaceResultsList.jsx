import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { deleteEventAndResults, putEvent } from '../../api/race/events';
import { putResults } from '../../api/race/results';
import TableResults from '../../components/Tables/TableResults/TableResults';
import { fetchEvents } from '../../redux/features/eventsSlice';

function RaceResultsList() {
  const [trigger, setTrigger] = useState(false);

  const { events, status } = useSelector((state) => state.fetchEvents);
  useTitle('Результаты заездов');
  useBackground(false);
  const dispatch = useDispatch();

  const updateResults = (eventId) => {
    putResults(eventId)
      .then((response) => {
        setTrigger((prev) => !prev);
        dispatch(
          getAlert({
            message: response.data.message,
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch((error) => {
        const message = error.response
          ? JSON.stringify(error.response.data.message || error.message)
          : 'Непредвиденная ошибка';
        dispatch(
          getAlert({
            message,
            type: 'error',
            isOpened: true,
          })
        );
      });
  };

  const removeEvent = (eventId, eventName) => {
    const isConfirmed = window.confirm(
      `Вы действительно хотите удалить заезд "${eventName}"? Будет удалён заезд и все результаты заезда!`
    );
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
    deleteEventAndResults(eventId)
      .then((response) => {
        setTrigger((prev) => !prev);
        dispatch(
          getAlert({
            message: response.data.message,
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch((error) => {
        const message = error.response
          ? JSON.stringify(error.response.data.message || error.message)
          : 'Непредвиденная ошибка';
        dispatch(
          getAlert({
            message,
            type: 'error',
            isOpened: true,
          })
        );
      });
  };

  const updateEventAndSinged = (eventId) => {
    putEvent(eventId)
      .then((response) => {
        setTrigger((prev) => !prev);
        dispatch(
          getAlert({
            message: response.data.message,
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch((error) => {
        const message = error.response
          ? JSON.stringify(error.response.data.message || error.message)
          : 'Непредвиденная ошибка';
        dispatch(
          getAlert({
            message,
            type: 'error',
            isOpened: true,
          })
        );
      });
  };

  useEffect(() => {
    dispatch(fetchEvents(true));
  }, [trigger, dispatch]);

  return (
    <section>
      {status === 'loading' && '...загрузка'}
      {events[0] && (
        <TableResults
          events={events}
          updateResults={updateResults}
          removeEvent={removeEvent}
          updateEventAndSinged={updateEventAndSinged}
        />
      )}
    </section>
  );
}

export default RaceResultsList;
