export const seriesPublicButtons = [
  { id: 0, page: '/schedule', name: 'Расписание' },
  { id: 1, page: '/results', name: 'Результаты' },
  { id: 2, page: '/regulations', name: 'Регламент' },
];

/**
 * Кнопки для навигации между результатами Этапов серии и итоговыми таблицами.
 */
export const createSeriesResultsButtons = (stageOrders) => {
  const summaryButton = { id: 0, page: '', name: 'Итого' };

  // Генерация кнопок для всех Этапов.
  const stageButtons = stageOrders.map((order, index) => ({
    id: index + 1,
    page: `/stage/${index + 1}`,
    name: `${order}`,
  }));

  return [summaryButton, ...stageButtons];
};
