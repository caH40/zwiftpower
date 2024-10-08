import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchEvents, resetEventsPreview } from '../../redux/features/api/eventsSlice';
import useTitle from '../../hook/useTitle';
import { useResize } from '../../hook/use-resize';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';
import MainInfo from '../../components/MainInfo/MainInfo';
import MainInfoDev from '../../components/MainInfo/MainInfoDev';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import AdMyPage from '../../components/AdMyPage/AdMyPage';
import { HelmetMain } from '../../components/Helmets/HelmetMain';
import SkeletonCardRacePreview from '../../components/SkeletonLoading/SkeletonCardRacePreview/SkeletonCardRacePreview';

import styles from './MainPage.module.css';

// рекламные блоки на странице
const inSideBar = 9;
const adOverFooter = 16;
const adNumbers = [inSideBar, adOverFooter];

function MainPage() {
  const { eventsPreview, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);
  const { isScreenLg: isDesktop } = useResize();
  const dispatch = useDispatch();
  useTitle('Ближайшие заезды Zwift');

  const navigate = useNavigate();
  const toLink = (id) => navigate(`/race/schedule/${id}`);

  useEffect(() => {
    dispatch(fetchEvents({ started: false, target: 'preview' }));

    return () => dispatch(resetEventsPreview());
  }, [dispatch]);

  useAd(adNumbers);

  return (
    <>
      <div className={styles.wrapper}>
        <HelmetMain />
        <section className={styles.wrapper__preview}>
          <SkeletonCardRacePreview status={statusFetchEvents} />

          {!!eventsPreview.length && statusFetchEvents === 'resolved' && (
            <CardRacePreview event={eventsPreview[0]} getClick={toLink} />
          )}

          {!isDesktop && <AdContainer number={9} marginBottom={15} />}

          {!!eventsPreview.length &&
            statusFetchEvents === 'resolved' &&
            eventsPreview
              .slice(1)
              .map((event) => (
                <CardRacePreview event={event} key={event.id} getClick={toLink} />
              ))}
        </section>

        <aside className={styles.wrapper__info}>
          <h2 className={styles.title__info}>Информационный блок</h2>
          <div className={styles.sidebar}>
            <AdMyPage
              href="/race/series/catchup/2024"
              title="Догонялки (Catchup)"
              subtitle="сезон 2024-2025"
              imageSrc="/images/open_graph/5.jpg"
            />

            {isDesktop && <AdContainer number={9} />}

            <MainInfo />
            <MainInfoDev isModerator={isModerator} />
          </div>
        </aside>
      </div>

      <AdContainer number={adOverFooter} maxWidth={1105} />
    </>
  );
}

export default MainPage;
