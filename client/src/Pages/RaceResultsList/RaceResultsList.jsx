import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';

import { getAlert } from '../../redux/features/alertMessageSlice';
import TableResults from '../../components/Tables/TableResults/TableResults';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import { fetchUpdateResult } from '../../redux/features/api/resultsSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';

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
