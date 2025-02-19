import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchEvents, resetEventsPreview } from '../../redux/features/api/eventsSlice';
import { millisecondsIn90Days } from '../../assets/dates';
import { useResize } from '../../hook/use-resize';
import { useAd } from '../../hook/useAd';
import { lsPrefixStreams } from '../../constants/localstorage';
import { HelmetMain } from '../../components/Helmets/HelmetMain';
import useBannerVisibility from '../../hook/useBannerVisibility';
import useTitle from '../../hook/useTitle';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';
import MainInfo from '../../components/MainInfo/MainInfo';
import MainInfoDev from '../../components/MainInfo/MainInfoDev';
import AdContainer from '../../components/AdContainer/AdContainer';
import AdMyPage from '../../components/AdMyPage/AdMyPage';
import SkeletonCardRacePreview from '../../components/SkeletonLoading/SkeletonCardRacePreview/SkeletonCardRacePreview';
// import GoprotectWidget from '../../components/AdPartner/GoprotectWidget/GoprotectWidget';
import BannerInformation from '../../components/BannerInformation/BannerInformation';
import DonateYooMoney from '../../components/Donate/DonateYooMoney/DonateYooMoney';

import styles from './MainPage.module.css';

// рекламные блоки на странице
const inSideBar = 9;
const adOverFooter = 16;
const adNumbers = [inSideBar, adOverFooter];

const storageKeyBanner = `${lsPrefixStreams}banner-organizer`;

function MainPage() {
  const { eventsPreview, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );
  const { role, organizer } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);
  const { isScreenLg: isDesktop } = useResize();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Хук установки заголовка h1 для страницы.
  useTitle('Ближайшие заезды Zwift');

  // Хук логики отображения информационного баннера.
  const isVisibleBanner = useBannerVisibility({
    storageKey: storageKeyBanner,
    intervalMs: millisecondsIn90Days,
    hidden: !!organizer,
  });

  const toLink = (id) => navigate(`/race/schedule/${id}`);

  useEffect(() => {
    dispatch(fetchEvents({ started: false, target: 'preview' }));

    return () => dispatch(resetEventsPreview());
  }, [dispatch]);

  useAd(adNumbers);

  const shouldRenderCard = !!eventsPreview.length && statusFetchEvents === 'resolved';

  const renderCards = (events, startIndex, endIndex) =>
    events
      .slice(startIndex, endIndex)
      .map((event) => <CardRacePreview event={event} key={event.id} getClick={toLink} />);

  return (
    <>
      <div className={styles.wrapper}>
        <HelmetMain />
        <section className={styles.wrapper__preview}>
          {/* Информационный (рекламный по сайту) баннер */}
          <BannerInformation
            initState={isVisibleBanner}
            storageKey={storageKeyBanner}
            marginBottom={14}
          >
            Вы организуете заезды в Zwift? Хотите, чтобы они отображались на нашем сайте? Пишите
            на{' '}
            <a className="link-dark" href="mailto:support@zwiftpower.ru">
              E-mail
            </a>{' '}
            или в{' '}
            <a
              className="link-dark"
              href="https://t.me/Aleksandr_BV"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
          </BannerInformation>

          {/* Скелетон загрузки */}
          <SkeletonCardRacePreview status={statusFetchEvents} />

          {shouldRenderCard && renderCards(eventsPreview, 0, 2)}

          {!isDesktop && <AdContainer number={9} maxHeight={400} />}

          {shouldRenderCard && renderCards(eventsPreview, 2)}
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

            <div className={styles.spacer__donate}>
              <DonateYooMoney />
            </div>

            {/* {isDesktop && <GoprotectWidget />} */}

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
