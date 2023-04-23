import React, { useEffect, useState } from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSchedule from '../../components/Tables/TableSchedule/TableSchedule';
import { getEvents } from '../../api/zwift/events';

import styles from './RaceSchedule.module.css';

function RaceSchedule() {
  const [events, setEvents] = useState([]);
  useTitle('Расписание заездов');
  useBackground(false);

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
  }, []);
  console.log(events);
  return (
    <section>
      <TableSchedule />
    </section>
  );
}

export default RaceSchedule;
