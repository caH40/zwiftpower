import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import { getEvents } from '../../api/zwift/events';
import { putEvent, deleteEvent } from '../../api/zwift/riders';
import { getAlert } from '../../redux/features/alertMessageSlice';

function RaceSchedule() {
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState(false);
  useTitle('Расписание заездов');
  useBackground(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getEvents(false).then((response) => {
      setEvents(response.data.events);
    });
  }, [trigger]);

  const updateEvent = (eventId) => {
    putEvent(eventId)
      .then((response) => {
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

  const removeEvent = (eventId) => {
    deleteEvent(eventId)
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
      {events?.length ? (
        <TableSchedule events={events} updateEvent={updateEvent} removeEvent={removeEvent} />
      ) : (
        'Loading...'
      )}
    </section>
  );
}

export default RaceSchedule;
