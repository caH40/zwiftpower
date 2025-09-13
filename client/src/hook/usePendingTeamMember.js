import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';

export function usePendingTeamMember() {
  const dispatch = useDispatch();

  async function handleApproveRequest({ userId, name }) {
    const confirmResponse = window.confirm(`Принять пользователя ${name} в команду?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch().unwrap();
      dispatch(getAlert({ message: res, type: 'success', isOpened: true }));
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
