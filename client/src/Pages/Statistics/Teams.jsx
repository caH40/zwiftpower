import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';
import { fetchTeamsLeaderboard } from '../../redux/features/api/team/fetchTeam';
import { resetTeamsLeaderboard } from '../../redux/features/api/team/teamSlice';
import useTitle from '../../hook/useTitle';
import TableTeamRanking from '../../components/Tables/TableTeamRanking/TableTeamRanking';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './Statistics.module.css';

/**
 * Страница статистики команд.
 */
export default function TeamsStatistics() {
  useTitle('Рейтинг команд');
  const { status, teamsLeaderboard } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamsLeaderboard());

    return () => dispatch(resetTeamsLeaderboard());
  }, [dispatch]);

  return (
    <section className={styles.wrapper}>
      <HelmetComponent {...STATISTICS_HELMET_PROPS.TEAM_STATISTICS} />

      <article className={styles.block__table}>
        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={status} rows={10} height={70} />

        {status === 'resolved' ? <TableTeamRanking teams={teamsLeaderboard} /> : null}
      </article>
    </section>
  );
}
