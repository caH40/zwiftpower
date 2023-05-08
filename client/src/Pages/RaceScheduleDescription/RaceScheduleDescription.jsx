import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import { getLocalDate } from '../../utils/date-convert';
import LoaderZ from '../../components/LoaderZ/LoaderZ';
import { fetchEventPreview } from '../../redux/features/api/eventPreviewSlice';

import styles from './RaceScheduleDescription.module.css';

function RaceScheduleDescription() {
  const { event, status } = useSelector((state) => state.fetchPreviewSlice);

  const dispatch = useDispatch();
  useTitle('Описание заезда');
  useBackground(false);
  const { eventId } = useParams();

  useEffect(() => {
    dispatch(fetchEventPreview(eventId));
  }, [eventId, dispatch]);

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
      {status === 'loading' && <LoaderZ />}
    </section>
  );
}

export default RaceScheduleDescription;
