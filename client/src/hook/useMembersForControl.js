import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchTeamMembers } from '../redux/features/api/team-member/fetchTeamMember';
import {
  fetchGetBannedRiders,
  fetchGetPendingRiders,
} from '../redux/features/api/team/fetchTeam';
import { resetTeamMembers } from '../redux/features/api/team-member/teamMemberSlice';
import { resetBannedRiders, resetPendingRiders } from '../redux/features/api/team/teamSlice';

/**
 * Хук для запроса:
 * -участников команды;
 * -ожидающих одобрения на вступление в команду;
 * -заблокированных пользователей.
 */
export function useMembersForControl(urlSlug) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamMembers({ urlSlug }));
    dispatch(fetchGetPendingRiders());
    dispatch(fetchGetBannedRiders());

    dispatch(resetTeamMembers());
    dispatch(resetPendingRiders());
    dispatch(resetBannedRiders());
  }, []);
}
