import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import OrganizerHeader from '../../components/OrganizerHeader/OrganizerHeader';
import { useResize } from '../../hook/use-resize';
import { HelmetOrganizerPublic } from '../../components/Helmets/HelmetOrganizerPublic';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import AdMyPage from '../../components/AdMyPage/AdMyPage';
import { fetchEvents, resetEventsSchedule } from '../../redux/features/api/eventsSlice';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';

import styles from './Organizer.module.css';

// Рекламные блоки на странице.
const adOverFooter = 22;
const adNumbers = [adOverFooter];

/**
 * Страница Организатора заездов.
 */
function OrganizerPublic() {
  const { eventsSchedule, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );

  const { isScreenXl: xl } = useResize();
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  useTitle(`Организатор ${organizer?.name || ''}`);

  const navigate = useNavigate();
  const toLink = (id) => navigate(`/race/schedule/${id}`);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, []);

  useEffect(() => {
    // Запрашивать Эвенты только конкретного организатора.
    if (!organizer?.id) {
      return undefined;
    }

    dispatch(fetchEvents({ started: false, organizerId: organizer?.id }));

    return () => dispatch(resetEventsSchedule());
  }, [dispatch, organizer]);

  useAd(adNumbers);
  return (
    <>
      <HelmetOrganizerPublic
        urlSlug={organizer.urlSlug}
        name={organizer.name}
        imageSrc={organizer.posterUrls?.medium}
      />

      <div className={styles.wrapper}>
        {organizer?.posterUrls?.original ? (
          // Основная секция страницы
          <section className={styles.main}>
            {/* Блок-шапка с данными Организатора */}
            <OrganizerHeader organizer={organizer} />

            {/* Предстоящие заезды, проводимые Организатором */}
            {!!eventsSchedule.length &&
              statusFetchEvents === 'resolved' &&
              eventsSchedule.map((eventPreview) => {
                return (
                  <CardRacePreview
                    event={eventPreview}
                    getClick={toLink}
                    key={eventPreview.id}
                  />
                );
              })}
          </section>
        ) : (
          <div></div>
        )}

        {/* Боковая панель. */}
        {xl && (
          <aside className={styles.aside}>
            <AdMyPage
              href="/race/series/catchup/2024"
              title="Догонялки (Catchup)"
              subtitle="сезон 2024-2025"
              imageSrc="/images/open_graph/5.jpg"
            />
          </aside>
        )}
      </div>

      <AdContainer number={adOverFooter} maxWidth={1105} />
    </>
  );
}

export default OrganizerPublic;
