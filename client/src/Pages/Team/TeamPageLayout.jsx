import { Outlet, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetTeam } from '../../redux/features/api/team/fetchTeam';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
import { SkeletonTeamHeader } from '../../components/SkeletonLoading/SkeletonTeamHeader/SkeletonTeamHeader';
import { allowForTeamCreator } from '../../utils/check-team-creator';
import { resetTeam } from '../../redux/features/api/team/teamSlice';
import { NavBarTeamPublic } from '../../components/UI/NavBarTeamPublic/NavBarTeamPublic';
import TeamHeader from '../../components/TeamHeader/TeamHeader';
import useTitle from '../../hook/useTitle';
import { NavBarTeamControl } from '../../components/UI/NavBarTeamPublic/NavBarTeamControl';
import SkeletonSeriesAd from '../../components/SkeletonLoading/SkeletonSeriesAd/SkeletonSeriesAd';
import AdSeries from '../../components/AdSeries/AdSeries';
import { fetchGetSeries } from '../../redux/features/api/series/fetchSeries';

import styles from './TeamPageLayout.module.css';

export default function TeamPage() {
  const { status: fetchTeamStatus, team } = useSelector((state) => state.team);
  const { urlSlug } = useParams();
  useTitle(`Команда${team ? ' ' + team.name : ''}`);
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);

  const { seriesPublic, status: fetchSeriesStatus } = useSelector(
    (state) => state.seriesPublic
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeries({ seriesStatus: 'ongoing' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetTeam({ urlSlug }));

    return () => dispatch(resetTeam());
  }, [urlSlug, dispatch]);

  const isCreator = allowForTeamCreator({ status, teamIdForPermission: team?._id, userInTeam });
  return (
    <div className={styles.wrapper}>
      <section className={styles.main}>
        {team ? (
          <TeamHeader team={team} />
        ) : (
          renderSkeletonCards({
            count: 1,
            SkeletonComponent: SkeletonTeamHeader,
            status: fetchTeamStatus,
          })
        )}

        {/* Кнопки навигации по страницам организатора */}
        <div className={styles.box__navbar}>
          <NavBarTeamPublic urlSlug={team?.urlSlug} isCreator={isCreator} />
        </div>

        {isCreator && (
          <div className={styles.box__navbar}>
            <NavBarTeamControl urlSlug={team?.urlSlug} />
          </div>
        )}

        <Suspense>
          <Outlet />
        </Suspense>
      </section>

      {/* Боковая панель. */}
      <aside className={styles.aside}>
        {!seriesPublic?.ongoing.length
          ? renderSkeletonCards({
              count: 4,
              SkeletonComponent: SkeletonSeriesAd,
              status: fetchSeriesStatus,
            })
          : null}

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
      </aside>
    </div>
  );
}
