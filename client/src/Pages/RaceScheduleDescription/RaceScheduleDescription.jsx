import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import { getLocalDate } from '../../utils/date-convert';
import { fetchEventPreview } from '../../redux/features/api/eventPreviewSlice';

import styles from './RaceScheduleDescription.module.css';

function RaceScheduleDescription() {
  const { event } = useSelector((state) => state.fetchEventPreview);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useTitle('Описание заезда');
  useBackground(false);
  const { eventId } = useParams();

  useEffect(() => {
    dispatch(fetchEventPreview(eventId));
  }, [eventId, dispatch]);

  useEffect(() => {
    if (event.hasResults) {
      navigate(`/race/results/${eventId}`, { replace: true });
    }
  }, [event, navigate, eventId]);

  return (
    <section>
      {event?.id && !event.hasResults && (
        <>
          <DescriptionEventZwiftNew event={event} forSchedule={true} />
          <Link
            className={styles.link}
            to={`https://www.zwift.com/eu/events/view/${event.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Регистрация в Zwift
          </Link>

          <TableSignedRiders riders={event.signedRiders} event={event} />

          <div className={styles.right}>
            <span className={styles.service}>Обновлено:</span>
            <span className={styles.service}>{getLocalDate(event.updated, 'short')}</span>
          </div>
        </>
      )}
    </section>
  );
}

export default RaceScheduleDescription;
