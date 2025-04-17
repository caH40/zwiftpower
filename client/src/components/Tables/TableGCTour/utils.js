import { getTimerLocal } from '../../../utils/date-local';

/**
 * Формирование строки заголовка таблицы для результатов этапа серии заездов.
 * @param {object} params - Входящие параметры.
 * @param {string} params.name - Название этапа.
 * @param {string} params.stageOrder - Номер этапа.
 * @param {string} params.eventStart - Время старта основного (первого) заезда этапа серии в формате toISOString.
 */
export const getSeriesCaption = ({ stageName, stageOrder, stageStart }) => {
  const eventStartStr = getTimerLocal(stageStart, 'DDMMYYHm');

  return `Результаты Этапа №${stageOrder}${
    stageName ? '. ' + stageName : ''
  }. Дата старта: ${eventStartStr}.`;
};
