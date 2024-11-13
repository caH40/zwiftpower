import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useResize } from '../../hook/use-resize';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import { initialSorting } from '../../redux/features/sortTableSlice';
import TableSignedRiders from '../../components/Tables/TableSignedRiders/TableSignedRiders';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import { getTimerLocal } from '../../utils/date-local';
import {
  fetchEventPreview,
  resetPreviewEventData,
} from '../../redux/features/api/eventPreviewSlice';
import NavBarSignedRiders from '../../components/UI/NavBarSignedRiders/NavBarSignedRiders';
import { useAd } from '../../hook/useAd';
import { HelmetSignedRiders } from '../../components/Helmets/HelmetSignedRiders';
import SkeletonDescEvent from '../../components/SkeletonLoading/SkeletonDescEvent/SkeletonDescEvent';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './SignedRiders.module.css';

// рекламные блоки на странице
const adOverFooter = 6;
const adUnderHeader = 12;
const adNumbers = [adUnderHeader, adOverFooter];

/**
 * Страница с описанием Эвента и таблицей зарегистрированных райдеров.
 */
function SignedRiders() {
  const { event, status: statusFetchEventPreview } = useSelector(
    (state) => state.fetchEventPreview
  );
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

      <div className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}

        {/* Скелетон загрузки для Постера */}
        <SkeletonDescEvent status={statusFetchEventPreview} />

        {event?.id && !event.started && statusFetchEventPreview === 'resolved' && (
          <>
            <DescriptionEventZwift event={event} forSchedule={true} />

            <Link
              className={styles.button__link}
              to={`https://www.zwift.com/eu/events/view/${event.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span className={styles.button__title}>Регистрация</span>
                <span className={styles.button__additional}>
                  {event.microserviceEventVisibility === 'DEFINED_BY_RESOURCE_ID' &&
                    `(только для участников клуба ${event.clubName})`}
                </span>
              </div>
            </Link>

            <Link
              className={styles.button__link}
              to={`https://www.zwift.com/eu/clubs/${event.microserviceExternalResourceId}/join`}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span className={styles.button__title}>Вступить в клуб</span>
                <span className={styles.button__additional}>{event.clubName}</span>
              </div>
            </Link>
            <NavBarSignedRiders />
          </>
        )}

        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={statusFetchEventPreview} rows={20} height={40} />

        {event?.id && !event.started && statusFetchEventPreview === 'resolved' && (
          <>
            <section className={styles.wrapper__wide}>
              <TableSignedRiders riders={event.signedRiders} event={event} />
            </section>

            <div className={styles.right}>
              <span className={styles.service}>Обновлено:</span>
              <span className={styles.service}>{getTimerLocal(event.updated, 'DDMMYYHm')}</span>
            </div>
          </>
        )}
      </div>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default SignedRiders;
