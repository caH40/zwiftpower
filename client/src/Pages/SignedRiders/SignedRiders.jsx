import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// import { useResize } from '../../hook/use-resize';
// import AdContainer from '../../components/AdContainer/AdContainer';
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
// import { useAd } from '../../hook/useAd';
import { HelmetSignedRiders } from '../../components/Helmets/HelmetSignedRiders';
import SignedRidersLinks from '../../components/SignedRidersLinks/SignedRidersLinks';
import SkeletonDescEvent from '../../components/SkeletonLoading/SkeletonDescEvent/SkeletonDescEvent';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import AdSeries from '../../components/AdSeries/AdSeries';

import styles from './SignedRiders.module.css';

// рекламные блоки на странице
// const adOverFooter = 6;
// const adUnderHeader = 12;
// const adNumbers = [adUnderHeader, adOverFooter];

/**
 * Страница с описанием Эвента и таблицей зарегистрированных райдеров.
 */
function SignedRiders() {
  const { event, status: statusFetchEventPreview } = useSelector(
    (state) => state.fetchEventPreview
  );
  const navigate = useNavigate();
  // const { isScreenLg: isDesktop } = useResize();

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

  // useAd(adNumbers);

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
        {/* Скелетон загрузки для Постера */}
        <SkeletonDescEvent status={statusFetchEventPreview} />

        {event?.id && !event.started && statusFetchEventPreview === 'resolved' && (
          <>
            <DescriptionEventZwift event={event} forSchedule={true} />

            <SignedRidersLinks
              eventId={event.id}
              clubName={event.clubName}
              microserviceExternalResourceId={event.microserviceExternalResourceId}
              microserviceEventVisibility={event.microserviceEventVisibility}
            />

            {event?.seriesId?.urlSlug && (
              <div className={styles.wrapper__series}>
                <AdSeries urlSlug={event.seriesId?.urlSlug} pageType="schedule" />
              </div>
            )}

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

      {/* {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )} */}
    </>
  );
}

export default SignedRiders;
