import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTeamMember } from '../../../redux/features/api/team-member/fetchTeamMember';
import {
  fetchGetBannedRiders,
  fetchGetPendingRiders,
} from '../../../redux/features/api/team/fetchTeam';
import { resetTeamMembers } from '../../../redux/features/api/team-member/teamMemberSlice';
import {
  resetBannedRiders,
  resetPendingRiders,
} from '../../../redux/features/api/team/teamSlice';

import styles from './TeamControlMembers.module.css';

/**
 * Страница управления участниками команды.
 * Добавление участников (одобрение заявок).
 * Исключение из команды.
 * Блокировка участников.
 */
export default function TeamControlMembersPage() {
  const { urlSlug } = useParams();
  const { team, pendingRiders, bannedRiders } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamMember({ urlSlug }));
    dispatch(fetchGetPendingRiders());
    dispatch(fetchGetBannedRiders());

    dispatch(resetTeamMembers());
    dispatch(resetPendingRiders());
    dispatch(resetBannedRiders());
  }, []);

  return <div className={styles.wrapper}>TeamControlMembersPage</div>;
}
