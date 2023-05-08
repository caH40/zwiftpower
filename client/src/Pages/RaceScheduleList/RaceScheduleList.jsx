import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchChangeEvent } from '../../redux/features/api/changeEventSlice';
import { fetchEvents } from '../../redux/features/api/eventsSlice';
import LoaderZ from '../../components/LoaderZ/LoaderZ';

function RaceScheduleList() {
  const [trigger, setTrigger] = useState(false);
  const { eventsPreview, status: statusEventsList } = useSelector((state) => state.fetchEvents);
  const { status: statusEventAndSinged } = useSelector((state) => state.fetchChangeEvent);

  useTitle('Расписание заездов');
  useBackground(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents(false));
  }, [dispatch, trigger]);

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
      {eventsPreview?.[0] && (
        <TableSchedule
          events={eventsPreview}
          updateEvent={updateEventAndSinged}
          removeEvent={removeEvent}
        />
      )}
      {statusEventsList === 'loading' && <LoaderZ />}
      {statusEventAndSinged === 'loading' && <LoaderZ />}
    </section>
  );
}

export default RaceScheduleList;
