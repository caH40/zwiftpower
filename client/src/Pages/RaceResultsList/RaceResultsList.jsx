import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { deleteEventAndResults, putEvent } from '../../api/race/events';
import TableResults from '../../components/Tables/TableResults/TableResults';
import { fetchEvents } from '../../redux/features/eventsSlice';
import { putResult } from '../../redux/features/resultsSlice';

function RaceResultsList() {
  const [trigger, setTrigger] = useState(false);

  const { events, status } = useSelector((state) => state.fetchEvents);
  useTitle('Результаты заездов');
  useBackground(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents(true));
  }, [dispatch, trigger]);

  const updateResults = (eventId) => {
    dispatch(putResult(eventId)).then((r) => setTrigger((p) => !p));
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

  return (
    <section>
      {status === 'loading' && (
        <div style={{ position: 'absolute', top: '100%', left: '50%', fontSize: '20px' }}>
          ...загрузка
        </div>
      )}
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
