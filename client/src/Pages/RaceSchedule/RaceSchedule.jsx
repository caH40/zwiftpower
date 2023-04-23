import React, { useEffect, useState } from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import { getEvents } from '../../api/zwift/events';

function RaceSchedule() {
  const [events, setEvents] = useState([]);
  useTitle('Расписание заездов');
  useBackground(false);

  useEffect(() => {
    getEvents(false).then((response) => {
      setEvents(response.data.events);
    });
  }, []);

  return <section>{events?.length ? <TableSchedule events={events} /> : 'Loading...'}</section>;
}

export default RaceSchedule;
