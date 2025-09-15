import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SkeletonTeamMemberCard } from '../../../components/SkeletonLoading/SkeletonTeamMemberCard/SkeletonTeamMemberCard';
import { renderSkeletonCards } from '../../../utils/skeleton-cards';
import { fetchPostJoinRequestInTeam } from '../../../redux/features/api/team/fetchTeam';
import { resetTeamMembers } from '../../../redux/features/api/team-member/teamMemberSlice';
import {
  fetchPostLeaveTeam,
  fetchTeamMembers,
} from '../../../redux/features/api/team-member/fetchTeamMember';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import Button from '../../../components/UI/Button/Button';
import CardTeamMember from '../../../components/CardTeamMember/CardTeamMember';

import styles from './TeamMembers.module.css';

export default function TeamMembersPage() {
  const { urlSlug } = useParams();
  const { status: fetchMembersStatus, teamMembers } = useSelector((state) => state.teamMember);
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);

  const dispatch = useDispatch();

  const join = async () => {
    try {
      const res = await dispatch(fetchPostJoinRequestInTeam({ urlSlug })).unwrap();
      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  };

  const leave = async () => {
    try {
      const res = await dispatch(fetchPostLeaveTeam({ urlSlug })).unwrap();
      dispatch(fetchTeamMembers({ urlSlug }));
      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  };

  useEffect(() => {
    dispatch(fetchTeamMembers({ urlSlug }));

    dispatch(resetTeamMembers());
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Для отображения кнопки пользователь должен быть авторизован и не должен состоять ни в одной команде */}
      {status && !userInTeam?.id && (
        <div className={styles.control}>
          <Button getClick={join}>Присоединиться</Button>
        </div>
      )}

      <section className={styles.cards}>
        {renderSkeletonCards({
          count: 3,
          SkeletonComponent: SkeletonTeamMemberCard,
          status: fetchMembersStatus,
        })}

        {teamMembers.map((m) => (
          <CardTeamMember key={m._id} member={m} />
        ))}
      </section>

      {status && userInTeam?.id && (
        <div className={styles.control}>
          <Button getClick={leave} addCls="back">
            Выйти из состава команды
          </Button>
        </div>
      )}
    </div>
  );
}
