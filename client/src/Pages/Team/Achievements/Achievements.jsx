import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { HelmetTeamAchievements } from '../../../components/Helmets/HelmetTeamAchievements';
import { fetchGetTeamStatistics } from '../../../redux/features/api/team/fetchTeam';
import { resetStatistics } from '../../../redux/features/api/team/teamSlice';
import useTitle from '../../../hook/useTitle';
import TeamStatistic from '../../../components/TeamStatistic/TeamStatistic';

import styles from './Achievements.module.css';

export default function TeamAchievementsPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);
  useTitle(`Достижения ${team ? ' ' + team.name : ''}`);
  const stats = useSelector((state) => state.team.statistics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTeamStatistics({ urlSlug }));

    return () => dispatch(resetStatistics());
  }, []);

  return (
    stats && (
      <div className={styles.wrapper}>
        <HelmetTeamAchievements
          teamName={team?.name}
          urlSlug={urlSlug}
          imageUrl={team?.logoUrls?.original}
        />

        <TeamStatistic stats={stats} />
      </div>
    )
  );
}
