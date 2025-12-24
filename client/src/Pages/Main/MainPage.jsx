import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchEvents, resetEventsPreview } from '../../redux/features/api/eventsSlice';
import { millisecondsIn90Days } from '../../assets/dates';
import { useResize } from '../../hook/use-resize';
import { lsPrefixStreams } from '../../constants/localstorage';
import useBannerVisibility from '../../hook/useBannerVisibility';
import useTitle from '../../hook/useTitle';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';
import MainInfo from '../../components/MainInfo/MainInfo';
import MainInfoDev from '../../components/MainInfo/MainInfoDev';
import AdContainer from '../../components/AdContainer/AdContainer';
import AdSeries from '../../components/AdSeries/AdSeries';
import SkeletonCardRacePreview from '../../components/SkeletonLoading/SkeletonCardRacePreview/SkeletonCardRacePreview';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { MAIN_HELMET_PROPS } from '../../assets/helmet-props';
import BannerInformation from '../../components/BannerInformation/BannerInformation';
import DonateBlock from '../../components/Donate/DonateBlock/DonateBlock';
import { fetchGetSeries } from '../../redux/features/api/series/fetchSeries';
import SkeletonSeriesAd from '../../components/SkeletonLoading/SkeletonSeriesAd/SkeletonSeriesAd';
import Poll from '../../components/Poll/Poll';
import { fetchGetPoll } from '../../redux/features/api/poll/fetchPoll';
import { resetPoll } from '../../redux/features/api/poll/pollSlice';
import { fetchTopTeamsLeaderboard } from '../../redux/features/api/team/fetchTeam';
import { resetTopTeamsLeaderboard } from '../../redux/features/api/team/teamSlice';
import TeamsRankingWidget from '../../components/TeamsRankingWidget/TeamsRankingWidget';
import SkeletonTeamRankingWidget from '../../components/SkeletonLoading/SkeletonTeamRankingWidget/SkeletonTeamRankingWidget';
import { renderSkeletonCards } from '../../utils/skeleton-cards';

import styles from './MainPage.module.css';

const storageKeyBanner = `${lsPrefixStreams}banner-organizer`;

function MainPage() {
  const { poll } = useSelector((state) => state.poll);

  const { eventsPreview, status: statusFetchEvents } = useSelector(
    (state) => state.fetchEvents
  );
  const { seriesPublic, status: fetchSeriesStatus } = useSelector(
    (state) => state.seriesPublic
  );
  const { role, organizer } = useSelector((state) => state.checkAuth.value.user);
  const { topTeamsLeaderboard, status: statusTopTeamsLeaderboard } = useSelector(
    (state) => state.team
  );
  const isModerator = ['admin', 'moderator'].includes(role);
  const { isScreenLg: isDesktop } = useResize();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetSeries({ seriesStatus: 'ongoing' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetPoll({ pollId: '691c9016c52f70c6bca2771f' }));

    return () => dispatch(resetPoll());
  }, [dispatch]);

  // top3 рейтинга команд
  useEffect(() => {
    dispatch(fetchTopTeamsLeaderboard());

    return () => dispatch(resetTopTeamsLeaderboard());
  }, [dispatch]);

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

  const shouldRenderCard = !!eventsPreview.length && statusFetchEvents === 'resolved';

  /**
   * startIndex
   * @param {*} events
   * @param {*} startIndex Используется для вставки рекламных блоков.
   * @param {*} endIndex Используется для вставки рекламных блоков.
   * @returns
   */
  const renderCards = (events, startIndex, endIndex) =>
    events
      .slice(startIndex, endIndex)
      .map((event) => <CardRacePreview event={event} key={event.id} getClick={toLink} />);

  return (
    <>
      <div className={styles.wrapper}>
        <HelmetComponent {...MAIN_HELMET_PROPS.MAIN} />

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
            <div className={styles.topTeamContainer}>
              <SkeletonTeamRankingWidget status={statusTopTeamsLeaderboard} />
              {topTeamsLeaderboard.length > 0 ? (
                <TeamsRankingWidget teams={topTeamsLeaderboard} />
              ) : null}
            </div>

            {/* Блок с голосованиями */}
            {poll && <Poll {...poll} />}

            {renderSkeletonCards({
              count: 4,
              SkeletonComponent: SkeletonSeriesAd,
              status: fetchSeriesStatus,
            })}

            {/* Рекламный блок текущих Серий */}
            {seriesPublic?.ongoing.map((s) => (
              <AdSeries
                key={s.urlSlug}
                urlSlug={s.urlSlug}
                posterUrls={s.posterUrls}
                name={s.name}
                dateStart={s.dateStart}
                dateEnd={s.dateEnd}
                isCard={true}
                pageType="schedule"
              />
            ))}

            <div className={styles.spacer__donate}>
              <DonateBlock />
            </div>

            <MainInfo />

            <MainInfoDev isModerator={isModerator} />
          </div>
        </aside>
      </div>
    </>
  );
}

export default MainPage;
