import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HelmetMain } from '../../components/Helmets/HelmetMain';
import { fetchEvents, resetEventsPreview } from '../../redux/features/api/eventsSlice';
import useTitle from '../../hook/useTitle';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';
import MainInfo from '../../components/MainInfo/MainInfo';
import MainInfoDev from '../../components/MainInfo/MainInfoDev';
import { fetchGetInfoDev } from '../../redux/features/api/popupInfoDevGetSlice';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';
import AdMyPage from '../../components/AdMyPage/AdMyPage';

import styles from './MainPage.module.css';

const notFound = 'К сожалению, заезды не найдены ... ((';

// рекламные блоки на странице
const adNumbers = [9];

function MainPage() {
  const { eventsPreview, status } = useSelector((state) => state.fetchEvents);
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);
  const dispatch = useDispatch();
  useTitle('Ближайшие заезды Zwift');

  const navigate = useNavigate();
  const toLink = (id) => navigate(`/race/schedule/${id}`);

  useEffect(() => {
    dispatch(fetchEvents({ started: false, target: 'preview' }));

    return () => dispatch(resetEventsPreview());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetInfoDev());
  }, [dispatch]);

  useAd(adNumbers);

  return (
    <>
      <section className={styles.wrapper}>
        <HelmetMain />
        <div className={styles.wrapper__preview}>
          {!eventsPreview[0]?.id && status === 'resolved' && (
            <div className={styles.title__notFound}>{notFound}</div>
          )}
          {eventsPreview.map((event) => (
            <CardRacePreview event={event} key={event.id} getClick={toLink} />
          ))}
        </div>
        <div className={styles.wrapper__info}>
          <h2 className={styles.title__info}>Информационный блок</h2>
          <div className={styles.sidebar}>
            <AdMyPage
              href="/race/series/catchup"
              title="Догонялки (Catchup)"
              subtitle="сезон 2023-2024"
              imageSrc="/images/open_graph/5.jpg"
            />
            <AdContainer number={9} />
            <MainInfo />
            <MainInfoDev isModerator={isModerator} />
          </div>
        </div>
      </section>
    </>
  );
}

export default MainPage;
