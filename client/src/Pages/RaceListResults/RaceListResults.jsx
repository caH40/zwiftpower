import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import { getEvents } from '../../api/zwift/events';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { deleteEventAndResults } from '../../api/race/events';
import { putResults } from '../../api/race/results';
import TableResults from '../../components/Tables/TableResults/TableResults';

function RaceListResults() {
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState(false);
  useTitle('Результаты заездов');
  useBackground(false);
  const dispatch = useDispatch();

  const updateEvent = (eventId) => {
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

  useEffect(() => {
    getEvents(true).then((response) => {
      setEvents(response.data.events);
    });
  }, [trigger]);

  return (
    <section>
      {events?.length ? (
        <TableResults events={events} updateEvent={updateEvent} removeEvent={removeEvent} />
      ) : (
        'Loading...'
      )}
    </section>
  );
}

export default RaceListResults;
