import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import AdContainer from '../../components/AdContainer/AdContainer';
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
import { HelmetSignedRiders } from '../../components/Helmets/HelmetSignedRiders';

import styles from './SignedRiders.module.css';

// рекламные блоки на странице
const adOverFooter = 6;
const adUnderHeader = 12;
const adOne = 12; // одна реклама в блоке
const adNumbers = [adOverFooter, adUnderHeader];

function SignedRiders() {
  const { event } = useSelector((state) => state.fetchEventPreview);
  const navigate = useNavigate();
  const { isScreenLg: isDesktop } = useResize();

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

  useAd(adNumbers);

  return (
    <>
      <HelmetSignedRiders
        eventId={eventId}
        image={event.imageUrl}
        name={event.name}
        eventStart={event.eventStart}
        organizer={event.organizer}
        typeRaceCustom={event.typeRaceCustom}
      />

      <section className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} height={150} marginBottom={10} />
        ) : null}
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
            <NavBarSignedRiders />
            <section className={styles.wrapper__wide}>
              <TableSignedRiders riders={event.signedRiders} event={event} />
            </section>
            <div className={styles.right}>
              <span className={styles.service}>Обновлено:</span>
              <span className={styles.service}>{getTimerLocal(event.updated, 'DDMMYYHm')}</span>
            </div>
          </>
        )}
      </section>
      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adOne} />
      )}
    </>
  );
}

export default SignedRiders;
