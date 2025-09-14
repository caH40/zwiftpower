import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import {
  fetchControlMembers,
  fetchTeamMembers,
} from '../redux/features/api/team-member/fetchTeamMember';
import {
  fetchGetBannedRiders,
  fetchGetPendingRiders,
} from '../redux/features/api/team/fetchTeam';

/**
 * Хук с обработчиками блока контроля над пользователем, подавшем заявку на вступление в команду.
 * @param {Object} props - Пропсы.
 * @param {string} urlSlug - urlSlug страницы на которой вызывается хук.
 * @returns
 */
export function useControlTeamMember({ urlSlug }) {
  const dispatch = useDispatch();

  /**
   * Обработчик одобрения заявки на присоединение к команде.
   */
  async function handleApproveRequest({ userId, name }) {
    const confirmResponse = window.confirm(`Принять пользователя ${name} в команду?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch(fetchControlMembers({ userId, action: 'approve' })).unwrap();

      // Запрос обновленного списка участников.
      // dispatch(fetchGetPendingRiders());
      // dispatch(fetchTeamMembers({ urlSlug }));

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  }

  /**
   * Обработчик отказа в заявки на присоединение к команде.
   */
  async function handleRejectRequest({ userId, name }) {
    const confirmResponse = window.confirm(
      `Отказать пользователю ${name} во вступлении в команду?`
    );
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch(fetchControlMembers({ userId, action: 'cancel' })).unwrap();

      // Запрос обновленного списка участников.
      dispatch(fetchGetPendingRiders());

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  }

  /**
   * Обработчик для блокировки пользователя для команды.
   */
  async function handleBanUser({ userId, name }) {
    const confirmResponse = window.confirm(`Заблокировать пользователя ${name} для команды?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch(fetchControlMembers({ userId, action: 'ban' })).unwrap();

      // Запрос обновленного списка участников.
      dispatch(fetchGetPendingRiders());
      dispatch(fetchTeamMembers({ urlSlug }));
      dispatch(fetchGetBannedRiders());

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  }

  /**
   * Обработчик для разблокировки пользователя для команды.
   */
  async function handleCancelBanUser({ userId, name }) {
    const confirmResponse = window.confirm(`Заблокировать пользователя ${name} для команды?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch(fetchControlMembers({ userId, action: 'cancelBan' })).unwrap();

      // Запрос обновленного списка участников.
      dispatch(fetchGetBannedRiders());

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  }

  /**
   * Обработчик исключения участника из команды.
   */
  async function handleExcludeUser({ userId, name }) {
    const confirmResponse = window.confirm(`Исключить пользователя ${name} из команды?`);
    if (!confirmResponse) {
      dispatch(getAlert({ message: 'Отмена действия', type: 'warning', isOpened: true }));
      return;
    }

    try {
      const res = await dispatch(fetchControlMembers({ userId, action: 'exclude' })).unwrap();

      // Запрос обновленного списка участников.
      dispatch(fetchTeamMembers({ urlSlug }));

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  }

  return {
    handleApproveRequest,
    handleRejectRequest,
    handleBanUser,
    handleExcludeUser,
    handleCancelBanUser,
  };
}
