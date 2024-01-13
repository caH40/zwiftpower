import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { initialSorting } from '../../redux/features/sortTableSlice';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import { getTimerLocal } from '../../utils/date-local';
import {
  fetchEventPreview,
  resetPreviewEventData,
} from '../../redux/features/api/eventPreviewSlice';
import NavBarSignedRiders from '../../components/UI/NavBarSignedRiders/NavBarSignedRiders';
import { useAd } from '../../hook/useAd';

import styles from './SignedRiders.module.css';

const adNumber = 6;

function SignedRiders() {
  const { event } = useSelector((state) => state.fetchEventPreview);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useTitle('Зарегистрированные участники');
  const { eventId } = useParams();

  useEffect(() => {
    dispatch(initialSorting({ columnName: 'Категория', isRasing: true }));
    dispatch(fetchEventPreview(eventId));

    return () => {
      dispatch(resetPreviewEventData());
    };
  }, [eventId, dispatch]);

  useEffect(() => {
    if (event.started) {
      navigate(`/race/results/${eventId}`, { replace: true });
    }
  }, [event, navigate, eventId]);

  useAd(adNumber);

  return (
    <>
      <section className={styles.wrapper}>
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
      <div id={`yandex_rtb_C-A-5165832-${adNumber}`}></div>
    </>
  );
}

export default SignedRiders;
