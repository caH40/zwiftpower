import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SkeletonTeamCard } from '../../components/SkeletonLoading/SkeletonTeamCard/SkeletonTeamCard';
import { useSortTeams } from '../../hook/useSeortTeams';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
import { TEAM_HELMET_PROPS } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { fetchGetTeams } from '../../redux/features/api/team/fetchTeam';
import { resetTeams } from '../../redux/features/api/team/teamSlice';
import useTitle from '../../hook/useTitle';
import CardTeam from '../../components/CardTeam/CardTeam';
import ButtonLocalUrl from '../../components/UI/ButtonUrl/ButtonLocalUrl';
import SkeletonSeriesAd from '../../components/SkeletonLoading/SkeletonSeriesAd/SkeletonSeriesAd';
import AdSeries from '../../components/AdSeries/AdSeries';
import { fetchGetSeries } from '../../redux/features/api/series/fetchSeries';

import styles from './Teams.module.css';

/**
 * Страница велосипедных команд в Звифте.
 */
export default function TeamsPublic() {
  useTitle('Команды');

  const {
    status,
    user: { team: userInTeam, zwiftId },
  } = useSelector((state) => state.checkAuth.value);

  const { seriesPublic, status: fetchSeriesStatus } = useSelector(
    (state) => state.seriesPublic
  );

  // Данные организаторов из хранилища редакс.
  const { status: fetchTeamsStatus, teams } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  // Запрос на получение списка команд.
  useEffect(() => {
    dispatch(fetchGetTeams());

    return () => dispatch(resetTeams());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetSeries({ seriesStatus: 'ongoing' }));
  }, [dispatch]);

  // Сначала команда пользователя, затем отсортированные по названию.
  const sortedTeams = useSortTeams(teams, userInTeam?.id);

  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...TEAM_HELMET_PROPS.TEAMS_PUBLIC} />

      {/* Для отображения кнопки пользователь должен */}
      {/* быть авторизован,не должен состоять ни в одной команде, к профилю должен быть привязан ZwiftId */}
      {status && !userInTeam?.id && zwiftId && (
        <div className={styles.control}>
          <ButtonLocalUrl href="/moderation/teams/create">Создать команду</ButtonLocalUrl>
        </div>
      )}

      <section className={styles.cards}>
        {renderSkeletonCards({
          count: 3,
          SkeletonComponent: SkeletonTeamCard,
          status: fetchTeamsStatus,
        })}

        {!!sortedTeams?.length &&
          sortedTeams.map((team) => <CardTeam key={team._id} {...team} />)}
      </section>

      {/* Боковая панель. */}
      <aside className={styles.aside}>
        <SkeletonSeriesAd status={fetchSeriesStatus} />
        <SkeletonSeriesAd status={fetchSeriesStatus} />
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
