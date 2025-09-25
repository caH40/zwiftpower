import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SkeletonTeamMemberCard } from '../../../components/SkeletonLoading/SkeletonTeamMemberCard/SkeletonTeamMemberCard';
import { renderSkeletonCards } from '../../../utils/skeleton-cards';
import { resetTeamMembers } from '../../../redux/features/api/team-member/teamMemberSlice';
import { fetchTeamMembers } from '../../../redux/features/api/team-member/fetchTeamMember';
import useTeamMembers from '../../../hook/useTeamMembers';
import ButtonSimple from '../../../components/UI/ButtonSimple/ButtonSimple';
import CardTeamMember from '../../../components/CardTeamMember/CardTeamMember';

import styles from './TeamMembers.module.css';

export default function TeamMembersPage() {
  const { urlSlug } = useParams();
  const { status: fetchMembersStatus, teamMembers } = useSelector((state) => state.teamMember);
  const { team } = useSelector((state) => state.team);
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamMembers({ urlSlug }));

    dispatch(resetTeamMembers());
  }, []);

  const { join, leave } = useTeamMembers({ urlSlug, teamName: team?.name });

  return (
    <div className={styles.wrapper}>
      {/* Для отображения кнопки пользователь должен быть авторизован и не должен состоять ни в одной команде */}
      {status && !userInTeam?.id && (
        <div className={styles.control}>
          <ButtonSimple onClick={join}>Присоединиться</ButtonSimple>
        </div>
      )}

      <section className={styles.cards}>
        {renderSkeletonCards({
          count: 3,
          SkeletonComponent: SkeletonTeamMemberCard,
          status: fetchMembersStatus,
        })}

        {teamMembers.map((m) => (m.rider ? <CardTeamMember key={m._id} member={m} /> : null))}
      </section>

      {status && userInTeam?.id && (
        <div className={styles.control}>
          <ButtonSimple onClick={leave} theme="orange">
            Выйти из команды
          </ButtonSimple>
        </div>
      )}
    </div>
  );
}
