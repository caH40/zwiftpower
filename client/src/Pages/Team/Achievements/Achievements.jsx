import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { HelmetTeamAchievements } from '../../../components/Helmets/HelmetTeamAchievements';
import useTitle from '../../../hook/useTitle';
import TeamStatistic from '../../../components/TeamStatistic/TeamStatistic';

import styles from './Achievements.module.css';

const teamData = {
  id: '123',
  name: 'Speed Racers Pro',
  imageSrc: '/images/team-logo.jpg',
  countryAlpha3: 'usa',
  category: 'A',
  totalMembers: 24,
  membersByCategory: {
    A: 8,
    B: 6,
    C: 5,
    D: 3,
    E: 2,
  },
  totalEvents: 156,
  totalMedals: {
    gold: 12,
    silver: 8,
    bronze: 15,
  },
  seriesWins: [
    { name: 'Zwift Racing League S4', place: 1 },
    { name: 'TFC Championship', place: 2 },
    { name: 'Summer Climb Series', place: 1 },
    { name: 'Winter Cup', place: 3 },
  ],
  ranking: 5,
  description: 'Профессиональная команда с фокусом на горные дисциплины и выносливость',
  establishedYear: 2020,
};

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

      <TeamStatistic team={teamData} />
    </div>
  );
}
