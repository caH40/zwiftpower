import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import { getTimerLocal } from '../../utils/date-local';
import {
  fetchEventPreview,
  resetPreviewEventData,
} from '../../redux/features/api/eventPreviewSlice';
import NavBarSignedRiders from '../../components/UI/NavBarSignedRiders/NavBarSignedRiders';
import { resetSortingSigned } from '../../redux/features/sortTableSignedSlice';

import styles from './SignedRiders.module.css';

function SignedRiders() {
  const { event } = useSelector((state) => state.fetchEventPreview);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useTitle('Зарегистрированные участники');
  const { eventId } = useParams();

  useEffect(() => {
    dispatch(fetchEventPreview(eventId));

    return () => {
      dispatch(resetSortingSigned());
      dispatch(resetPreviewEventData());
    };
  }, [eventId, dispatch]);

  useEffect(() => {
    if (event.started) {
      navigate(`/race/results/${eventId}`, { replace: true });
    }
  }, [event, navigate, eventId]);

  return (
    <section>
      {event?.id && !event.started && (
        <>
          <DescriptionEventZwiftNew event={event} forSchedule={true} />
          <Link
            className={styles.button}
            to={`https://www.zwift.com/eu/events/view/${event.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Регистрация в Zwift
          </Link>
          <section className={styles.wrapper__wide}>
            <NavBarSignedRiders />
            <TableSignedRiders riders={event.signedRiders} event={event} />
          </section>
          <div className={styles.right}>
            <span className={styles.service}>Обновлено:</span>
            <span className={styles.service}>{getTimerLocal(event.updated, 'DDMMYYHm')}</span>
          </div>
        </>
      )}
    </section>
  );
}

export default SignedRiders;
