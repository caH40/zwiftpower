import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { renderSkeletonCards } from '../../../utils/skeleton-cards';
import useTitle from '../../../hook/useTitle';
import CardRacePreview from '../../../components/CardRacePreview/CardRacePreview';
import { fetchEvents, resetEventsSchedule } from '../../../redux/features/api/eventsSlice';
import { HelmetOrganizerPublic } from '../../../components/Helmets/HelmetOrganizerPublic';
import SkeletonCardRacePreview from '../../../components/SkeletonLoading/SkeletonCardRacePreview/SkeletonCardRacePreview';

import styles from './OrganizerSchedule.module.css';

/**
 * Страница расписания заездов Организатора.
 */
export default function OrganizerSchedule() {
  const { eventsSchedule, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);
  useTitle(organizer?.name && `Расписание заездов от ${organizer?.name}`);

  const dispatch = useDispatch();

  useEffect(() => {
    // Запрашивать Эвенты только конкретного организатора.
    if (!organizer?.id) {
      return undefined;
    }

    dispatch(fetchEvents({ started: false, organizerId: organizer?.id }));

    return () => dispatch(resetEventsSchedule());
  }, [dispatch, organizer]);

  const navigate = useNavigate();
  const toLink = (id) => navigate(`/race/schedule/${id}`);

  return (
    <section className={styles.wrapper}>
      <HelmetOrganizerPublic
        urlSlug={organizer.urlSlug}
        name={organizer.name}
        imageSrc={organizer.posterUrls?.large}
        pageType="schedule"
      />

      {/* Скелетон загрузки */}

      {!eventsSchedule.length
        ? renderSkeletonCards({
            count: 5,
            SkeletonComponent: SkeletonCardRacePreview,
            status: statusFetchEvents,
          })
        : null}

      {eventsSchedule.map((eventPreview) => {
        return <CardRacePreview event={eventPreview} getClick={toLink} key={eventPreview.id} />;
      })}
    </section>
  );
}
