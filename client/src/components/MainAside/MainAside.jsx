import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderSkeletonCards } from '../../utils/skeleton-cards';
import { fetchGetOngoingSeries } from '../../redux/features/api/series/fetchSeries';
import { fetchGetPoll } from '../../redux/features/api/poll/fetchPoll';
import { resetPoll } from '../../redux/features/api/poll/pollSlice';
import { fetchTopTeamsLeaderboard } from '../../redux/features/api/team/fetchTeam';
import { resetTopTeamsLeaderboard } from '../../redux/features/api/team/teamSlice';
import SkeletonSeriesAd from '../SkeletonLoading/SkeletonSeriesAd/SkeletonSeriesAd';
import Poll from '../Poll/Poll';
import DonateBlock from '../Donate/DonateBlock/DonateBlock';
import MainInfo from '../MainInfo/MainInfo';
import MainInfoDev from '../MainInfo/MainInfoDev';
import SkeletonTeamRankingWidget from '../SkeletonLoading/SkeletonTeamRankingWidget/SkeletonTeamRankingWidget';
import TeamsRankingWidget from '../TeamsRankingWidget/TeamsRankingWidget';
import AdSeries from '../AdSeries/AdSeries';
import AdBannerContainer from '../AdBannerContainer/AdBannerContainer';

import styles from './MainAside.module.css';
import { adsConfig } from '../../assets/adsConfig';

/**
 * @param {object} props
 * @param {
 *   paths: string[],        // Список путей, к которым применяется конфиг
 *   showAside: boolean,     // Показывать ли боковую панель на странице
 *   includeChildren: boolean,   // Применимо ко всем вложенным страницам
 *   widgets: string[],     // Список виджетов для отображения в aside
 *   ads: string[],         // Список рекламных блоков для отображения в aside
 * } props.config
 * Боковая панель страниц с виджетами и рекламой.
 */
export default function MainAside({ config }) {
  const showWidget = (widgetName) => config.widgets.includes(widgetName);

  const adsProps = config?.ads.map((adName) => adsConfig[adName]).filter((ad) => ad);

  const dispatch = useDispatch();
  const { poll } = useSelector((state) => state.poll);

  const { ongoingSeriesPublic, status: fetchSeriesStatus } = useSelector(
    (state) => state.seriesPublic
  );

  const { topTeamsLeaderboard, status: statusTopTeamsLeaderboard } = useSelector(
    (state) => state.team
  );
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);

  // Запрос данных для виджета текущих Серий заездов.
  useEffect(() => {
    dispatch(fetchGetOngoingSeries());
  }, [dispatch]);

  // Запрос данных для виджета голосования.
  useEffect(() => {
    dispatch(fetchGetPoll({ pollId: '691c9016c52f70c6bca2771f' }));

    return () => dispatch(resetPoll());
  }, [dispatch]);

  // Запрос данных для виджета рейтинга команд.
  useEffect(() => {
    dispatch(fetchTopTeamsLeaderboard());

    return () => dispatch(resetTopTeamsLeaderboard());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {showWidget('teamsRanking') && (
        <div className={styles.topTeamContainer}>
          <SkeletonTeamRankingWidget status={statusTopTeamsLeaderboard} />
          {topTeamsLeaderboard.length > 0 ? (
            <TeamsRankingWidget teams={topTeamsLeaderboard} />
          ) : null}
        </div>
      )}

      {adsProps.map((adProps) => (
        <AdBannerContainer {...adProps} key={adProps.name} />
      ))}

      {/* Рекламный блок текущих Серий */}
      {showWidget('ongoingSeries') && (
        <>
          {ongoingSeriesPublic.map((s) => (
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

          {!ongoingSeriesPublic.length
            ? renderSkeletonCards({
                count: 4,
                SkeletonComponent: SkeletonSeriesAd,
                status: fetchSeriesStatus,
              })
            : null}
        </>
      )}

      {/* Блок с голосованиями */}
      {showWidget('poll') && poll && <Poll {...poll} />}

      {showWidget('donateBlock') && (
        <div className={styles.spacer__donate}>
          <DonateBlock />
        </div>
      )}
      {showWidget('siteInfo') && <MainInfo />}

      {showWidget('devInfo') && <MainInfoDev isModerator={isModerator} />}
    </div>
  );
}
