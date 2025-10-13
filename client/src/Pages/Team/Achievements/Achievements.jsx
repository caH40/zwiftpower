import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useTitle from '../../../hook/useTitle';
import { HelmetTeamAchievements } from '../../../components/Helmets/HelmetTeamAchievements';

import styles from './Achievements.module.css';

export default function TeamAchievementsPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);

  useTitle(`Достижения ${team ? ' ' + team.name : ''}`);
  const { status: fetchMembersStatus, teamMembers } = useSelector((state) => state.teamMember);
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);
  return (
    <div className={styles.wrapper}>
      <HelmetTeamAchievements
        teamName={team?.name}
        urlSlug={urlSlug}
        imageUrl={team?.logoUrls?.original}
      />
    </div>
  );
}
