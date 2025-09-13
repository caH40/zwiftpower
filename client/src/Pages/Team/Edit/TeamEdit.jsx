import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { allowForTeamCreator } from '../../../utils/check-team-creator';
import { resetTeamMembers } from '../../../redux/features/api/team-member/teamMemberSlice';
import {
  resetBannedRiders,
  resetPendingRiders,
} from '../../../redux/features/api/team/teamSlice';
import {
  fetchGetBannedRiders,
  fetchGetPendingRiders,
} from '../../../redux/features/api/team/fetchTeam';
import { fetchTeamMember } from '../../../redux/features/api/team-member/fetchTeamMember';
import useTitle from '../../../hook/useTitle';

import styles from './TeamEdit.module.css';

/**
 * Страница управления/редактирования командой.
 */
export default function TeamEditPage() {
  useTitle('Управление командой');
  const { urlSlug } = useParams();
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);
  const { team, pendingRiders, bannedRiders } = useSelector((state) => state.team);
  console.log({ pendingRiders, bannedRiders });

  useEffect(() => {
    dispatch(fetchTeamMember({ urlSlug }));
    dispatch(fetchGetPendingRiders());
    dispatch(fetchGetBannedRiders());

    dispatch(resetTeamMembers());
    dispatch(resetPendingRiders());
    dispatch(resetBannedRiders());
  }, []);

  const dispatch = useDispatch();

  const showPage = allowForTeamCreator({ status, teamIdForPermission: team?._id, userInTeam });
  // Если пользователь не создатель команды - редирект на 404
  if (!showPage) {
    return <Navigate to="/404" replace />;
  }
  return <div className={styles.wrapper}></div>;
}
