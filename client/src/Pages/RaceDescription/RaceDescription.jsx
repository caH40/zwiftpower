import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import { getEvent } from '../../api/zwift/events';
import { getLocalDate } from '../../utils/date-convert';

import styles from './RaceDescription.module.css';

function RaceDescription() {
  const [event, setEvent] = useState({});
  useTitle('Описание заезда');
  useBackground(false);
  const { eventId } = useParams();

  useEffect(() => {
    getEvent(eventId).then((response) => {
      setEvent(response.data.event);
    });
  }, [eventId]);

  return (
    <section>
      {event?.id ? (
        <>
          <DescriptionEventZwift event={event} forSchedule={true} />
          <Link
            className={styles.link}
            to={`https://www.zwift.com/eu/events/view/${event.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Регистрация в Zwift
          </Link>
          <TableSignedRiders riders={event.signedRiders} />

          <div className={styles.right}>
            <span className={styles.service}>Обновлено:</span>
            <span className={styles.service}>{getLocalDate(event.updated, 'short')}</span>
          </div>
        </>
      ) : (
        'Заезд не найден!'
      )}
    </section>
  );
}

export default RaceDescription;
