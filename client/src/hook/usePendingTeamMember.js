import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import { fetchControlMembers } from '../redux/features/api/team-member/fetchTeamMember';
import { fetchGetPendingRiders } from '../redux/features/api/team/fetchTeam';

export function usePendingTeamMember() {
  const dispatch = useDispatch();

  async function handleApproveRequest({ userId, name }) {
    const confirmResponse = window.confirm(`Принять пользователя ${name} в команду?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch(fetchControlMembers({ userId, action: 'approve' })).unwrap();

      // Запрос обновленного списка участников.
      dispatch(fetchGetPendingRiders());

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  }

  function handleRejectRequest({ userId, name }) {
    const confirmResponse = window.confirm(
      `Отказать пользователю ${name} во вступлении в команду?`
    );
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }
  }

  function handleBanUser({ userId, name }) {
    const confirmResponse = window.confirm(`Заблокировать пользователя ${name} для команды?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }
  }

  return { handleApproveRequest, handleRejectRequest, handleBanUser };
}
