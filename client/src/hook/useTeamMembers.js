import { useDispatch } from 'react-redux';

import {
  fetchPostLeaveTeam,
  fetchTeamMembers,
} from '../redux/features/api/team-member/fetchTeamMember';
import { fetchPostJoinRequestInTeam } from '../redux/features/api/team/fetchTeam';
import { getAlert } from '../redux/features/alertMessageSlice';

export default function useTeamMembers({ urlSlug, teamName }) {
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
      const confirm = window.confirm(
        `Вы действительно хотите выйти из состава команды "${teamName}?"`
      );

      if (!confirm) {
        dispatch(
          getAlert({ message: 'Отмена выхода из команды!', type: 'warning', isOpened: true })
        );
        return;
      }

      const res = await dispatch(fetchPostLeaveTeam({ urlSlug })).unwrap();
      dispatch(fetchTeamMembers({ urlSlug }));
      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  };

  return { join, leave };
}
